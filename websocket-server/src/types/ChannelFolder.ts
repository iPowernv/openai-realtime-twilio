export interface ChannelFolder {
    folderID: number;
    channelID: number;
    folderName: string;
    externalFolderID: string;
    isActive: boolean;
    folderDirection: string; // Bijvoorbeeld 'Incoming' | 'Outgoing' | 'Both'
  }
  

export interface MailboxFolderDTO {
  id: string;
  displayName: string;
}
