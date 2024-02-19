export interface ChatResponse {
  chatId: number;
  firstUserName: string;
  secondUserName: string;
  messageList: Message[] | null;
}

export interface Message {
  id: number;
  senderEmail: string;
  createdTime: Date;
  replyMessage: string;
  chatId: number;
}
