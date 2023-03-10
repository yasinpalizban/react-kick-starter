import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface INewsComment {


  pager?: IPagination,
  data?: [{
    id: number,
    replyId: number,
    postId: number,
    username: string,
    userId: number,
    userImage:string,
    message: string,
    replyComment?: [{
      id: number,
      replyId: number,
      postId: number,
      username: string,
      userImage:string,
      userId: number,
      message: string
      createdAt:  Date
      updatedAt:  Date,
      deletedAt:  Date,
    }],
    createdAt:  Date
    updatedAt:  Date,
    deletedAt:  Date,

  }];

}
