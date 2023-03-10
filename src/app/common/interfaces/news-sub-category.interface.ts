import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface INewsSubCategory {


  pager?:IPagination;
  data?: [{
    id: number,
    categoryId: number,
    name: string,
    category: string,
    language: string,

  }];

}
