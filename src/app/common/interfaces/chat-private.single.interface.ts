export interface IChat {
  id?: number;
  userReceiverId?: number;
  userSenderId?: number;
  message?: string;
  status?: number;
  replyId?: number;
  replyMessage?: string;
  media?: [{
    id: number,
    chatPrivateId: number,
    path: string,
  }];
  createdAt?: { date: Date, timezone: string, timezone_type: number };
  updatedAt?: { date: Date, timezone: string, timezone_type: number };
  deletedAt?: { date: Date, timezone: string, timezone_type: number };


}
