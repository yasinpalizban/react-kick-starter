import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IViewOption {

  insertId?: number;

  pager?:IPagination;
  data?: [{
    id: number,
    name: string,
    media?: [{
      id: number,
      path: string,
      title: string,
      description: string,
      viewOptionId: number
    }]
  }];

}
