import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IRequestPost {

  insertId?: number;
  pager?:IPagination;
  data?: [{
    id: number,
    userId: number,
    categoryId: number,
    title: string,
    body: string,
    status: boolean,
    category: string,
    language: string,
    username: string,
    lastName: string,
    firstName: string,
    replyCount: number,
    createdAt:  Date,
    updatedAt:  Date,
    deletedAt:  Date,
  }];

}
