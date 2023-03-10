import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IChatPrivate {

  insertId?: number;
  pager?:IPagination;
  data?: [{
    id?: number,
    userSenderId?: number,
    userReceiverId?: number,
    message?: string,
    status?: number,
    replyId?: number,
    replyMessage?: string,
    media?: [{
      id: number,
      chatPrivateId: number,
      path: string,
    }],
    createdAt?: { date: Date, timezone: string, timezone_type: number },
    updatedAt?: { date: Date, timezone: string, timezone_type: number },
    deletedAt?: { date: Date, timezone: string, timezone_type: number }
  }];

}
