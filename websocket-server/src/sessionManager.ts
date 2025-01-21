import { RawData, WebSocket } from "ws";
import functions from "./functionHandlers";
import { createTicketMessage } from './api/ticketMessages';
import { TicketMessageCreateDTO } from './types/TicketMessage';

interface Session {
  twilioConn?: WebSocket;
  frontendConn?: WebSocket;
  modelConn?: WebSocket;
  streamSid?: string;
  saved_config?: any;
  lastAssistantItem?: string;
  responseStartTimestamp?: number;
  latestMediaTimestamp?: number;
  openAIApiKey?: string;
  fromNumber?: string;
  toNumber?: string;
  apiToken?: string;
  channelID?: number;
  ticketID?: number;
  systemInstructions?: string;
  messageID?:number;
}

let session: Session = {};
export { session };

const allToolSchemas = functions.map(f => f.schema);


export function handleCallConnection(ws: WebSocket, openAIApiKey: string) {
  cleanupConnection(session.twilioConn);
  session.twilioConn = ws;
  session.openAIApiKey = openAIApiKey;

  ws.on("message", handleTwilioMessage);
  ws.on("error", ws.close);
  ws.on("close", () => {
    cleanupConnection(session.modelConn);
    cleanupConnection(session.twilioConn);
    session.twilioConn = undefined;
    session.modelConn = undefined;
    session.streamSid = undefined;
    session.lastAssistantItem = undefined;
    session.responseStartTimestamp = undefined;
    session.latestMediaTimestamp = undefined;
    if (!session.frontendConn) session = {};
  });
}

export function handleFrontendConnection(ws: WebSocket) {
  cleanupConnection(session.frontendConn);
  session.frontendConn = ws;

  ws.on("message", handleFrontendMessage);
  ws.on("close", () => {
    cleanupConnection(session.frontendConn);
    session.frontendConn = undefined;
    if (!session.twilioConn && !session.modelConn) session = {};
  });
}

async function handleFunctionCall(item: { name: string; arguments: string }) {
  console.log("Handling function call:", item);
  const fnDef = functions.find((f) => f.schema.name === item.name);
  if (!fnDef) {
    throw new Error(`No handler found for function: ${item.name}`);
  }

  let args: unknown;
  try {
    args = JSON.parse(item.arguments);
  } catch {
    return JSON.stringify({
      error: "Invalid JSON arguments for function call.",
    });
  }

  try {
    console.log("Calling function:", fnDef.schema.name, args);
    const result = await fnDef.handler(args as any);
    return result;
  } catch (err: any) {
    console.error("Error running function:", err);
    return JSON.stringify({
      error: `Error running function ${item.name}: ${err.message}`,
    });
  }
}

function handleTwilioMessage(data: RawData) {
  const msg = parseMessage(data);
  if (!msg) return;

  switch (msg.event) {
    case "start":
      session.streamSid = msg.start.streamSid;
      session.latestMediaTimestamp = 0;
      session.lastAssistantItem = undefined;
      session.responseStartTimestamp = undefined;
      tryConnectModel();
      break;
    case "media":
      session.latestMediaTimestamp = msg.media.timestamp;
      if (isOpen(session.modelConn)) {
        jsonSend(session.modelConn, {
          type: "input_audio_buffer.append",
          audio: msg.media.payload,
        });
      }
      break;
    case "close":
      closeAllConnections();
      break;
  }
}

function handleFrontendMessage(data: RawData) {
  const msg = parseMessage(data);
  if (!msg) return;

  if (isOpen(session.modelConn)) {
    jsonSend(session.modelConn, msg);
  }

  if (msg.type === "session.update") {
    session.saved_config = msg.session;
  }
}

const config = session.saved_config || {};
if (session.systemInstructions) { 
  config.instructions = session.systemInstructions;
  config.tools = allToolSchemas;
}



function tryConnectModel() {
  if (!session.twilioConn || !session.streamSid || !session.openAIApiKey)
    return;
  if (isOpen(session.modelConn)) return;
  const config = session.saved_config || {};
  if (session.systemInstructions) { 
    config.instructions = session.systemInstructions;
    config.tools = allToolSchemas;
  }
      // === Belangrijk: als we systemInstructions hebben, stuur ze dan naar de frontend via "session.instructions" ===
      if (session.systemInstructions && session.frontendConn) {
        jsonSend(session.frontendConn, {
          type: "session.instructions",
          instructions: session.systemInstructions,
        });
      }

  session.modelConn = new WebSocket(
    "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17",
    {
      headers: {
        Authorization: `Bearer ${session.openAIApiKey}`,
        "OpenAI-Beta": "realtime=v1",
      },
    }
  );

  session.modelConn.on("open", () => {




    jsonSend(session.modelConn, {
      type: "session.update",
      session: {
        modalities: ["text", "audio"],
        turn_detection: { type: "server_vad" },
        voice: "ash",
        input_audio_transcription: { model: "whisper-1" },
        input_audio_format: "g711_ulaw",
        output_audio_format: "g711_ulaw",
        tools: allToolSchemas,
        ...config,
      },
    });
  });

    
  
    

  session.modelConn.on("message", handleModelMessage);
  session.modelConn.on("error", closeModel);
  session.modelConn.on("close", closeModel);
}

async function handleModelMessage(data: RawData) {
  const event = parseMessage(data);
  if (!event) return;
  jsonSend(session.frontendConn, event);
  console.log(event.type)

  switch (event.type) {
    case "session.created":
      console.log("==> Session is created", event.session);
// Stuur daarna de "eerste user-bericht" als conversation.item.create
const greetEvent = {
  type: "conversation.item.create",
  item: {
    type: "message",
    role: "user",
    content: [
      {
        type: "input_text",
        text: "Greet the caller in their own language, using a time-of-day awareness. For example, if it is morning in their local time zone, say “Good morning,” if it is afternoon, say “Good afternoon,” and so on (even if the language is not English, adapt accordingly). If you know the caller’s name from the EndUser information, address them by name, e.g. “Good afternoon, Thierry De Decker, welcome to iPower. I am AnswerPal, your 24 on 7 digital assistant. How can I help you today?” If no name is available, greet them in a polite, friendly manner.",
      },
    ],
  },
};
jsonSend(session.modelConn, greetEvent);

  // Stuur daarna de response.create:
  const responseEvent = {
    type: "response.create",
    response: {
      // Indien je geen speciale overrides nodig hebt, volstaat leeg of:
      modalities: ["text", "audio"],
      // ...
    },
  };
  jsonSend(session.modelConn, responseEvent);
  break;

  case "error":
    console.error("==> Error:", event.error);
    break;
  case "session.updated":
    console.log("==> Session is updated to:", event.session);
    break;
    case "input_audio_buffer.speech_started":
      handleTruncation();
      break;
      case "conversation.item.input_audio_transcription.completed":
             {
               const { transcript } = event;
               if (session.ticketID) 
                {
                  const dto: TicketMessageCreateDTO = {
                    channel: 'Phone',
                    channelID: session.channelID || 0,
                    ticketID: session.ticketID,
                    message: transcript,
                    senderType: 'EndUser',
                    fromNumber: session.fromNumber || '',
                    toNumber: session.toNumber || '',
                    incoming:true,
                    uid: session.fromNumber || '',

                    // ...
                  };
                  try {
                    const newMessageDetail = await createTicketMessage(dto);
                    session.messageID=newMessageDetail.messageID;
                    console.log('Created message detail:', newMessageDetail);
                  } catch (err) {
                    console.error('Failed to create enduser ticket message:', err);
                    console.log(dto);
                  }
               }
             }
              break;



    case "response.audio.delta":
      if (session.twilioConn && session.streamSid) {
        if (session.responseStartTimestamp === undefined) {
          session.responseStartTimestamp = session.latestMediaTimestamp || 0;
        }
        if (event.item_id) session.lastAssistantItem = event.item_id;

        jsonSend(session.twilioConn, {
          event: "media",
          streamSid: session.streamSid,
          media: { payload: event.delta },
        });

        jsonSend(session.twilioConn, {
          event: "mark",
          streamSid: session.streamSid,
        });
      }
      break;

      case "response.audio_transcript.done":
             {
               const { transcript } = event;

               if (session.ticketID) 
                {
                  const dto: TicketMessageCreateDTO = {
                    channel: 'Phone',
                    channelID: session.channelID || 0,
                    ticketID: session.ticketID,
                    message: transcript,
                    senderType: 'CustomerRep',
                    fromNumber: session.fromNumber || '',
                    toNumber: session.toNumber || '',
                    incoming:false,
                    uid: session.fromNumber || '',
                  };
                  try {
                    const newMessageDetail = await createTicketMessage(dto);
                    console.log('Created message detail:', newMessageDetail);
                  } catch (err) {
                    console.error('Failed to create customerrep ticket message:', err);
                    console.log(dto);
                  }
               }
             }
              break;

    case "response.output_item.done": {
      const { item } = event;
      if (item.type === "function_call") {
        handleFunctionCall(item)
          .then((output) => {
            if (session.modelConn) {
              jsonSend(session.modelConn, {
                type: "conversation.item.create",
                item: {
                  type: "function_call_output",
                  call_id: item.call_id,
                  output: JSON.stringify(output),
                },
              });
              jsonSend(session.modelConn, { type: "response.create" });
            }
          })
          .catch((err) => {
            console.error("Error handling function call:", err);
          });
      }
      break;
    }
  }
}

function handleTruncation() {
  if (
    !session.lastAssistantItem ||
    session.responseStartTimestamp === undefined
  )
    return;

  const elapsedMs =
    (session.latestMediaTimestamp || 0) - (session.responseStartTimestamp || 0);
  const audio_end_ms = elapsedMs > 0 ? elapsedMs : 0;

  if (isOpen(session.modelConn)) {
    jsonSend(session.modelConn, {
      type: "conversation.item.truncate",
      item_id: session.lastAssistantItem,
      content_index: 0,
      audio_end_ms,
    });
  }

  if (session.twilioConn && session.streamSid) {
    jsonSend(session.twilioConn, {
      event: "clear",
      streamSid: session.streamSid,
    });
  }

  session.lastAssistantItem = undefined;
  session.responseStartTimestamp = undefined;
}

function closeModel() {
  cleanupConnection(session.modelConn);
  session.modelConn = undefined;
  if (!session.twilioConn && !session.frontendConn) session = {};
}

function closeAllConnections() {
  if (session.twilioConn) {
    session.twilioConn.close();
    session.twilioConn = undefined;
  }
  if (session.modelConn) {
    session.modelConn.close();
    session.modelConn = undefined;
  }
  if (session.frontendConn) {
    session.frontendConn.close();
    session.frontendConn = undefined;
  }
  session.streamSid = undefined;
  session.lastAssistantItem = undefined;
  session.responseStartTimestamp = undefined;
  session.latestMediaTimestamp = undefined;
  session.saved_config = undefined;
}

function cleanupConnection(ws?: WebSocket) {
  if (isOpen(ws)) ws.close();
}

function parseMessage(data: RawData): any {
  try {
    return JSON.parse(data.toString());
  } catch {
    return null;
  }
}

function jsonSend(ws: WebSocket | undefined, obj: unknown) {
  if (!isOpen(ws)) return;
  ws.send(JSON.stringify(obj));
}

function isOpen(ws?: WebSocket): ws is WebSocket {
  return !!ws && ws.readyState === WebSocket.OPEN;
}
