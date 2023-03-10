import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IAdvertisementMedia {


  pager?:IPagination;
  data?: [{
    id: number,
    advertisementId: number,
    path: string,
  }];

}
