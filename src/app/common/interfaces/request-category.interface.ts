import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IRequestCategory {


  pager?:IPagination;
  data?: [{
    id: number,
    name: string,
    language: string,

  }];

}
