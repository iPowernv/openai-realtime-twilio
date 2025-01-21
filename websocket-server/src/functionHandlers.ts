import { FunctionHandler } from "./types";
import {addTopicToMessage, getPromptDocumentsByMessageId, updateTicketMessage} from "./api/ticketMessages";
import { session } from "./sessionManager";

import {
  AddTopicRequest, TicketMessageUpdateDTO
} from './types/TicketMessage';

const functions: FunctionHandler[] = [];


// Topic 15 - Keyboost offer request
functions.push({
  schema: {
    name: "get_information_15",
    type: "function",
    description: "Keyboost offer request",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part",
        },
      },
      required: [],
    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 15 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,
      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 16 - Keyboost order request
functions.push({
  schema: {
    name: "get_information_16",
    type: "function",
    description: "Keyboost order request",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part",
        },
      },
      required: [],
    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 16 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,
      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 17 - Keyboost order status
functions.push({
  schema: {
    name: "get_information_17",
    type: "function",
    description: "Keyboost order status",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part",
        },
      },
      required: [ "customerRef", "keyboostCampaign" ],
    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 17 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,
      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 18 - Keyboost trial request
functions.push({
  schema: {
    name: "get_information_18",
    type: "function",
    description: "Keyboost trial request",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part",
        },
      },
      required: [],
    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 18 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,
      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 19 - Keyboost stop campaign
functions.push({
  schema: {
    name: "get_information_19",
    type: "function",
    description: "Keyboost stop campaign",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part to stop",
        },
}, required: [] 

    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 19 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,

      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 20 - Keyboost how does it work
functions.push({
  schema: {
    name: "get_information_20",
    type: "function",
    description: "Keyboost how does it work",
    parameters: {
      type: "object",
      properties: {
}, required: [] 
    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 20 };
    await addTopicToMessage(dto);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 21 - Keyboost campaign results
functions.push({
  schema: {
    name: "get_information_21",
    type: "function",
    description: "Keyboost campaign results (General campaign information + list of keywords). Start with this call for any Keyboost related question.",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part",
        },
}, required: [ "customerRef", "keyboostCampaign" ] 
    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 21 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,

      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 22 - Login problem
functions.push({
  schema: {
    name: "get_information_22",
    type: "function",
    description: "Login problem (customer website)",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
}, required: [] 
    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 22 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,

      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 23 - Invoice
functions.push({
  schema: {
    name: "get_information_23",
    type: "function",
    description: "Invoice (Issues related to an invoice)",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 23 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 24 - Keyboost order
functions.push({
  schema: {
    name: "get_information_24",
    type: "function",
    description: "Keyboost order",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part",
        },
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 24 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,

      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 25 - Change invoice data
functions.push({
  schema: {
    name: "get_information_25",
    type: "function",
    description: "Change invoice data",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 25 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,

      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 26 - Keyboost trial NPS
functions.push({
  schema: {
    name: "get_information_26",
    type: "function",
    description: "Keyboost trial NPS",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part",
        },
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 26 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,

      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 27 - Keyboost offer NPS
functions.push({
  schema: {
    name: "get_information_27",
    type: "function",
    description: "Keyboost offer NPS",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"The keyboost campaign name taken from the EndUser Specific Information part",
        },
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 27 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,

      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 28 - Order blog articles
functions.push({
  schema: {
    name: "get_information_28",
    type: "function",
    description: "Order blog articles",
    parameters: {
      type: "object",
      properties: {
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 28 };
    await addTopicToMessage(dto);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 29 - Guest blogging
functions.push({
  schema: {
    name: "get_information_29",
    type: "function",
    description: "Guest blogging",
    parameters: {
      type: "object",
      properties: {
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 29 };
    await addTopicToMessage(dto);


    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 30 - Development
functions.push({
  schema: {
    name: "get_information_30",
    type: "function",
    description: "Development",
    parameters: {
      type: "object",
      properties: {
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 30 };
    await addTopicToMessage(dto);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 32 - Domainname registrations or webhosting
functions.push({
  schema: {
    name: "get_information_32",
    type: "function",
    description: "Domainname registrations or webhosting (Emails from old customers)",
    parameters: {
      type: "object",
      properties: {
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 32 };
    await addTopicToMessage(dto);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 33 - AnswerPal
functions.push({
  schema: {
    name: "get_information_33",
    type: "function",
    description: "AnswerPal",
    parameters: {
      type: "object",
      properties: {
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 33 };
    await addTopicToMessage(dto);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 34 - AI
functions.push({
  schema: {
    name: "get_information_34",
    type: "function",
    description: "AI (Messages related to our AI services)",
    parameters: {
      type: "object",
      properties: {
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 34 };
    await addTopicToMessage(dto);


    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 36 - Keyboost Reseller
functions.push({
  schema: {
    name: "get_information_36",
    type: "function",
    description: "Keyboost Reseller",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 36 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 37 - SEO Page Optimizer
functions.push({
  schema: {
    name: "get_information_37",
    type: "function",
    description: "SEO Page Optimizer",
    parameters: {
      type: "object",
      properties: {
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 37 };
    await addTopicToMessage(dto);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 38 - Human Resources
functions.push({
  schema: {
    name: "get_information_38",
    type: "function",
    description: "Human Resources",
    parameters: {
      type: "object",
      properties: {
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 38 };
    await addTopicToMessage(dto);


    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 40 - How much is a website worth?
functions.push({
  schema: {
    name: "get_information_40",
    type: "function",
    description: "How much is a website worth?",
    parameters: {
      type: "object",
      properties: {
        customerRef: {
          type: "string",
          description:"The customer reference taken from the EndUser Specific Information part",
        },
        keyboostCampaign: {
          type: "string",
          description:"Keyboost campaign (if relevant)",
        },
      }, 
required:   []    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 40 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        CustomerID: args.customerRef,
        KeyboostCampaign: args.keyboostCampaign,

      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// Topic 42 - Get historical ranking information about a specific keyword
functions.push({
  schema: {
    name: "get_information_42",
    type: "function",
    description: "Get historical ranking information about a specific keyword, must include country and lang and KeyboostCampaign",
    parameters: {
      type: "object",
      properties: {
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
      // You could make some parameters required if truly necessary:
      required: ["keyboostCampaign", "keyword", "lang", "country"],
    },
  },
  handler: async (args) => {
    const dto = { messageID: session.messageID || 0, topicID: 42 };
    await addTopicToMessage(dto);

    const dtoUpdate = {
      messageID: session.messageID || 0,
      customFieldsData: {
        KeyboostCampaign: args.keyboostCampaign,
        Keyword: args.keyword,
        lang: args.lang,
        country: args.country,
      },
    };
    await updateTicketMessage(session.messageID || 0, dtoUpdate);

    const docs = await getPromptDocumentsByMessageId(session.messageID || 0, true);
    const docsArray = docs?.promptDocuments || [];
    const docsCombined = docsArray.map((doc) => doc.content || "").join("\n\n");

    return JSON.stringify(docsCombined);
  },
});

// You can keep adding more functions if more Topic IDs come into play.



export default functions;
