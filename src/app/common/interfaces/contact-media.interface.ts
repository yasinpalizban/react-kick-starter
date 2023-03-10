import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IContactMedia {


  pager?:IPagination;
  data?: [{
    id: number,
    contactId: number,
    path: string,
  }];

}
