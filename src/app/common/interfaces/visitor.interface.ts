import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IVisitor {
  pager?:IPagination;
  data?: [{
    id: number,
    ip: string ,
    country: string,
    city: string,
    lang: string,
    lat: string,
    os: string,
    createdAt: Date,
    updatedAt:  Date,
    deletedAt:  Date,
  }];

}
