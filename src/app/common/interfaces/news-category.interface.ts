import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface INewsCategory {

  pager?:IPagination;
  data?: [{
    id: number,
    name: string,
    language: string,

  }];

}
