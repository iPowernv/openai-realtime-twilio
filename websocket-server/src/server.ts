//src/server.ts
import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import { IncomingMessage } from "http";
import dotenv from "dotenv";
import http from "http";
import { readFileSync } from "fs";
import moment from "moment";
import { join } from "path";
import cors from "cors";
import {
  handleCallConnection,
  handleFrontendConnection,
} from "./sessionManager";
import functions from "./functionHandlers";
import { session } from "./sessionManager"; 
import { phoneLoginServer } from "./api/apiServer";
import { createTicket, getTicketHistorySummary } from "./api/tickets";
import {getDocumentById} from "./api/documents";

dotenv.config();

const PORT = parseInt(process.env.PORT || "8081", 10);
const PUBLIC_URL = process.env.PUBLIC_URL || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY environment variable is required");
  process.exit(1);
}

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.urlencoded({ extended: false }));

const twimlPath = join(__dirname, "twiml.xml");
const twimlTemplate = readFileSync(twimlPath, "utf-8");

app.get("/public-url", (req, res) => {
  res.json({ publicUrl: PUBLIC_URL });
});

app.all("/twiml", async (req, res) => {
  const fromNumber = req.body.From;
  const toNumber = req.body.To;
  const callSid = req.body.CallSid;
  const callerCountry = req.body.CallerCountry;
  const callerState = req.body.CallerState;
  const callerCity = req.body.CallerCity;
  console.log(req.body)

  // Sla ze op in je "session" (of in een globale variabele, of waar je maar wilt)
  session.fromNumber = fromNumber;
  session.toNumber = toNumber;

  const phoneLoginToken = await phoneLoginServer(toNumber);
  session.apiToken = phoneLoginToken;

  

    // 2) Maak ticket aan:
  const newTicket = await createTicket({
    status:    "New",
    subject:   `Incoming phone call ${fromNumber} -> ${toNumber}`,
    escalated: false,
    isSpam:    false,
    isClosed:  false,
    channel:   "Phone",
    channelID: session.channelID,
    uid:       session.fromNumber,
    twilio_CallSid : callSid,
    


  });
  session.ticketID = newTicket.ticketID; // Bewaar in session

  // 3) Get system instructions. 
  const historySummary = await getTicketHistorySummary(session.ticketID);
  console.log(historySummary)

  const document = await getDocumentById(60, true);
  const now = moment().utc().format('YYYY-MM-DD HH:mm:ss');
  const instructions = `${document.content}\n\n# Caller details\n\nPhone number: ${fromNumber}\nCountry: ${callerCountry}\nState: ${callerState}\nCity: ${callerCity}\nCurrent UTC 24h DateTime: ${now}\n\n${historySummary}\n\n`; 
  console.log(instructions )


  session.systemInstructions = instructions;




  const wsUrl = new URL(PUBLIC_URL);
  wsUrl.protocol = "wss:";
  wsUrl.pathname = `/call`;

  const twimlContent = twimlTemplate.replace("{{WS_URL}}", wsUrl.toString());
  res.type("text/xml").send(twimlContent);
});

// New endpoint to list available tools (schemas)
app.get("/tools", (req, res) => {
  res.json(functions.map((f) => f.schema));
});

let currentCall: WebSocket | null = null;
let currentLogs: WebSocket | null = null;

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const parts = url.pathname.split("/").filter(Boolean);

  if (parts.length < 1) {
    ws.close();
    return;
  }

  const type = parts[0];

  if (type === "call") {
    if (currentCall) currentCall.close();
    currentCall = ws;
    handleCallConnection(currentCall, session.openAIApiKey || "");
  } else if (type === "logs") {
    if (currentLogs) currentLogs.close();
    currentLogs = ws;
    handleFrontendConnection(currentLogs);
  } else {
    ws.close();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


function jsonSend(ws: WebSocket | undefined, obj: unknown) {
  if (!isOpen(ws)) return;
  ws.send(JSON.stringify(obj));
}

function isOpen(ws?: WebSocket): ws is WebSocket {
  return !!ws && ws.readyState === WebSocket.OPEN;
}
