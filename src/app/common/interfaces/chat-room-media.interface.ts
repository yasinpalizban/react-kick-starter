import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IChatRoomMedia {


  pager?:IPagination;
  data?: [{
    id: number,
    chatRoomId: number,
    path: string,
  }];

}
