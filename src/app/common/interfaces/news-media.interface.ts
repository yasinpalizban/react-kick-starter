import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface INewsMedia {


  pager?:IPagination;
  data?: [{
    id: number,
    postId: number,
    title: string,
    image: string,
    thumbnail: string,
    video: string,
  }];

}
