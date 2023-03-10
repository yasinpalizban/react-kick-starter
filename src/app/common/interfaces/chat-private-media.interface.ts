import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IChatPrivateMedia {


  pager?:IPagination;
  data?: [{
    id: number,
    chatPrivateId: number,
    path: string,
  }];

}
