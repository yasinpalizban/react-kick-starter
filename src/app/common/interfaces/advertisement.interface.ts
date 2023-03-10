import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IAdvertisement {

  insertId?: number;

  pager?:IPagination;
  data?: [{
    id: number,
    name: string,
    link: string,
    description: string,
    status: boolean,
    media?: [{
      id: number,
      advertisementId: number,
      path: string,
    }]
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  }];

}
