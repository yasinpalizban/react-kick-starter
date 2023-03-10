import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IChatRoom {

  insertId?: number;

  pager?:IPagination;
  data?: [{
    id?: number,
    userId?: number,
    groupId?: number,
    message?: string,
    status?: number,
    replyId?: number,
    replyMessage?: string,
    media?: [{
      id: number,
      chatRoomId: number,
      path: string,
    }],
    createdAt?: { date: Date, timezone: string, timezone_type: number },
    updatedAt?: { date: Date, timezone: string, timezone_type: number },
    deletedAt?: { date: Date, timezone: string, timezone_type: number },
  }];

}
