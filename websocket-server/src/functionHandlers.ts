// src/functionHandlers.ts
import { FunctionHandler } from "./types";
import {
  addTopicToMessage,
  getPromptDocumentsByMessageId,
  updateTicketMessage,
  generateAiReply,
  escalateTicketMessageById,
} from "./api/ticketMessages";
import { session } from "./sessionManager";
import WebSocket from "ws";
import { AddTopicRequest, TicketMessageUpdateDTO } from "./types/TicketMessage";

const functions: FunctionHandler[] = [];

functions.push({
  schema: {
    name: "get_specific_information",
    type: "function",
    description:
      "Get more detailed information about the topic, including Keyboost campaign results, " +
      "historic ranking info, invoices, orders, etc. Provide a valid CustomerRef and/or KeyboostCampaign. " +
      "Always mention to the caller to wait a moment while retrieving the information.",
    parameters: {
      type: "object",
      properties: {
        topicid: {
          type: "number",
          description: "The ID of the topic to fetch",
        },
        customerRef: {
          type: "string",
          description: "Customer reference from the EndUser Specific Info",
        },
        keyboostCampaign: {
          type: "string",
          description: "Keyboost campaign name from EndUser Specific Info",
        },
        keyword: {
          type: "string",
          description: "Keyword for which historic ranking info is requested",
        },
        lang: {
          type: "string",
          description: "Language code in ISO 639-1 format",
        },
        country: {
          type: "string",
          description: "Country code in ISO 3166-1 alpha-2 format",
        },
      },
      required: ["topicid"],
    },
  },
  handler: async (args) => {
    const { topicid, customerRef } = args;
    let keyboostCampaign = args.keyboostCampaign;

    // 1) Add the topic to this message
    const dto: AddTopicRequest = {
      messageID: session.messageID || 0,
      topicID: topicid,
    };
    await addTopicToMessage(dto);

    // 2) Update the message with custom fields
    const dtoUpdate: TicketMessageUpdateDTO = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: customerRef,
        KeyboostCampaign: keyboostCampaign,
        Keyword: args.keyword,
        Lang: args.lang,
        Country: args.country,
      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    // If the user provided BOTH a customerRef and a keyboostCampaign:
    if (customerRef || keyboostCampaign) {
      if (!keyboostCampaign) {
        keyboostCampaign="dummy campaign"
      }

      // 3) Check if snippet is already in systemInstructions
      const snippetTag = `# Keyboost Campaign ${keyboostCampaign}`;
      const alreadyPresent =
        session.systemInstructions?.includes(snippetTag) ?? false;

      if (alreadyPresent) {
        // If the snippet is already there => just get short AI reply
        const shortReply = await generateAiReply(session.messageID || 0);
        // Return minimal text
        return JSON.stringify(
          "Say: " + shortReply
        );
      } else {
        // Not present => do normal docs fetch + snippet extraction
        const docs = await getPromptDocumentsByMessageId(
          session.messageID || 0,
          true
        );
        const docsArray = docs?.promptDocuments || [];
        const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

        // 4) Attempt to find the snippet in docsCombined
        //    from '# Keyboost Campaign {keyboostCampaign}' until next line that starts with '# '
        const snippetRegex = new RegExp(
          `^#\\s*Keyboost\\s*Campaign\\s*${escapeRegex(keyboostCampaign)}([^]*?)(?=^#\\s|$)`,
          "m"
        );
        const match = docsCombined.match(snippetRegex);

        if (match) {
          // found snippet
          const snippet = match[0];
          if (!session.systemInstructions?.includes(snippet)) {
            // add to systemInstructions
            session.systemInstructions = (session.systemInstructions || "") + "\n\n" + snippet;

            // Now do a session.update if model is open
            if (session.modelConn && session.modelConn.readyState === WebSocket.OPEN) {
              // update local config
              const allToolSchemas = functions.map(f => f.schema);
              session.saved_config = session.saved_config || {};
              session.saved_config.instructions = session.systemInstructions;
              session.saved_config.tools = allToolSchemas;
              session.saved_config.voice="coral"

              const updateEvent = {
                type: "session.update",
                session: {
                  ...session.saved_config,
                },
              };
              session.modelConn.send(JSON.stringify(updateEvent));
            }
          }
        }

        // 5) Finally produce the “short reply” + (optionally) the docs
        const shortReply = await generateAiReply(session.messageID || 0);
        if (keyboostCampaign==="dummy campaign") {
          return JSON.stringify("# Say\n\n" + shortReply +"\n\n# Don't say, remember\n\n"+docsCombined);
        }
        return JSON.stringify("Say: " + shortReply );
      }
    } else {
      // If user did NOT provide both => do normal docs approach
      const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
      const docsArray = docs?.promptDocuments || [];
      const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");
      return JSON.stringify(docsCombined);
    }
  },
});

// Another example function
functions.push({
  schema: {
    name: "escalate_to_human",
    type: "function",
    description: "Tries to find an available staff member to take over.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  handler: async () => {
    const msg = await escalateTicketMessageById(session.messageID || 0, {});
    return JSON.stringify(msg);
  },
});

export default functions;

/** Helper to safely escape user input for a RegExp. */
function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
