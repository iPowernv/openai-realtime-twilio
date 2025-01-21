// src/types/HookAction.ts

export interface HookActionReadDTO {
    hookActionID: number;
    hookName: string; // Vervanger van specialTopic
    actionID: number;
    actionName: string;
    channelName?: string;
    priority: number;
    // eventueel meer velden die je wilt tonen
  }
  
  /**
   * CreateDTO voor hooks: hookName is verplicht, topicID bestaat niet.
   */
  export interface HookActionCreateDTO {
    hookName: string;     // Overeenkomst met backend: is SpecialTopic
    actionID: number;
    channelID?: number;
    specialChannel?: 'Email' | 'Chat' | 'Phone' | 'WhatsApp' | 'All';
    priority: number;
  }
  
  /**
   * Update enkel Priority.
   */
  export interface HookActionUpdateDTO {
    priority: number;
  }
  