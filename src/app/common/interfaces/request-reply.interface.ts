import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IRequestReply {


  insertId?: number;
  pager?:IPagination;
  data?: [{
    id: number,
    replyId: number,
    postId: number,
    username: string,
    userId: number,
    message: string,
    replyMessage: string,
    createdAt?:  Date,
    updatedAt?: Date,
    deletedAt?:  Date,

  }];

}
