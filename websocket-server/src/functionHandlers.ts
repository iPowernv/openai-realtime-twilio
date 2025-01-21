import { FunctionHandler } from "./types";
import {addTopicToMessage, getPromptDocumentsByMessageId, updateTicketMessage} from "./api/ticketMessages";
import { session } from "./sessionManager";

import {
  AddTopicRequest, TicketMessageUpdateDTO
} from './types/TicketMessage';

const functions: FunctionHandler[] = [];


functions.push({
  schema: {
    name: "get_specific_information",
    type: "function",
    description: "Get more detailed information about the topic, including Keyboost campaign results, historic ranking information of a specific keyword, or information about invoices, orders, ... Add a valid CustomerRef and/or KeyboostCampagaign . ",
    parameters: {
      type: "object",
      properties: {
        topicid: {
          type: "number",
          description:"The ID of the topic to fetch",
        },
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part",
        },
        keyword: {  
          type: "string",
          description:"The keyword for which you want to know the historic ranking information",
        },
        lang: { 
          type: "string",
          description:"The language of the keyword in ISO 639-1 format",
        },
        country: {
          type: "string",
          description:"The country of the keyword in ISO 3166-1 alpha-2 format",
      },
      },
      required: ["topicid"],
    },
  },
  handler: async (args: { topicid: number, customerRef?:string, keyboostCampaign?:string, keyword?:string, lang?:string, country?:string }) => {
    const dto: AddTopicRequest = {messageID: session.messageID||0, topicID:args.topicid};
    await addTopicToMessage(dto);

    const dtoUpdate: TicketMessageUpdateDTO = {messageID:session.messageID||0, customFieldsData: {CustomerID: args.customerRef, KeyboostCampaign: args.keyboostCampaign, Keyword: args.keyword, Lang: args.lang, Country: args.country}};
    await updateTicketMessage(session.messageID||0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID||0, true);
    const docsArray = docs?.promptDocuments || []; 
    // 3) Content van docs samenvoegen met "\n\n" ertussen
    const docsCombined = docsArray
    .map((doc) => doc.content || "")
    .join("\n\n");


    return JSON.stringify(docsCombined);
    
  },
});

functions.push({
  schema: {
    name: "get_topic_information",
    type: "function",
    description: "Get more information about a topic ",
    parameters: {
      type: "object",
      properties: {
        topicid: {
          type: "number",
          description:"The ID of the topic to fetch",
        },
      },
      required: ["topicid"],
    },
  },
  handler: async (args: { topicid: number }) => {
    const dto: AddTopicRequest = {messageID: session.messageID||0, topicID:args.topicid};
    await addTopicToMessage(dto);

    const docs = await getPromptDocumentsByMessageId(session.messageID||0, true);
    const docsArray = docs?.promptDocuments || []; 
    // 3) Content van docs samenvoegen met "\n\n" ertussen
    const docsCombined = docsArray
    .map((doc) => doc.content || "")
    .join("\n\n");


    return JSON.stringify(docsCombined);
    
  },
});


export default functions;
