import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface INewsPost {

  insertId?: number;
  pager?: IPagination;
  data?: [{
    id: number,
    userId: number,
    categoryId: number,
    subCategoryId: number,
    title: string,
    body: string,
    status: boolean,
    picture: string,
    category: string,
    subCategory: string,
    username: string,
    lastName: string,
    firstName: string,
    visit:number,
    media?: [{
      id: number,
      postId: number,
      title: string,
      image: string,
      thumbnail: string,
      video: string,
    }],
    commentCount: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  }];

}
