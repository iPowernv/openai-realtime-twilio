// De DTO's (aanpassen naar jouw naming)
export interface ChannelTranslationsReadDTO {
    channelTranslationID: number;
    channelID: number;
    lang: string;
    chatTitle: string;
    defaultGreeting: string;
    sendButtonText: string;
    escalatePrompt: string;
    yesText: string;
    noText: string;
    availabilityCheck: string;
    validEmail: string;
    youText: string;
    submitButtonText: string;
    succesfulSubmission: string;
    agentJoin: string;
  }
  
  // Creëer & Update (afhankelijk van hoe je ze onderscheidt in de backend)
  export interface ChannelTranslationsCreateDTO {
    channelID: number;
    lang: string;
    chatTitle: string;
    defaultGreeting: string;
    sendButtonText: string;
    escalatePrompt: string;
    yesText: string;
    noText: string;
    availabilityCheck: string;
    validEmail: string;
    youText: string;
    submitButtonText: string;
    succesfulSubmission: string;
    agentJoin: string;
  }
  
  export interface ChannelTranslationsUpdateDTO {
    // channelID & lang worden genegeerd in PUT (op server), 
    // channelTranslationID in de URL
    chatTitle: string;
    defaultGreeting: string;
    sendButtonText: string;
    escalatePrompt: string;
    yesText: string;
    noText: string;
    availabilityCheck: string;
    validEmail: string;
    youText: string;
    submitButtonText: string;
    succesfulSubmission: string;
    agentJoin: string;
  }