import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IContact {

  insertId?: number;

  pager?:IPagination;
  data?: [{
    id: number,
    title: string,
    name: string,
    email: string,
    message: string,
    reply: string,
    phone: number,
    status: boolean,
    media?: [{
      id: number,
      contactId: number,
      path: string,
    }]
    createdAt:  Date,
    updatedAt:  Date,
    deletedAt: Date,

  }];

}
