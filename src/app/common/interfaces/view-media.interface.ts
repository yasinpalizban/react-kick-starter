import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IViewMedia {


  pager?:IPagination;
  data?: [{
    id: number,
    viewOptionId: number,
    path: string,
    name: string,
    title:string,
    language:string,
    description:string

  }];

}
