import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {Group} from "../../authorization/models/group.model";
import {IStateCommon} from "../../shared/interfaces/state.common.interface";
import {IGroup} from "../../authorization/interfaces/group.interface";

export interface IOverView {
  hotelOrderPost?: [{
    id: number,
    userId: number,
    title: string,
    status: number,
    delivery: number,
    receipt: string,
    username: string,
    phone: string,
    email: string,
    lastName: string,
    firstName: string,
    city: string,
    address: string,
    orders: [{
      id: number,
      userId: number,
      categoryId: number,
      title: string,
      body: string,
      status: number,
      image: string,
      price: string,
      category: string,
      username: string,
      lastName: string,
      firstName: string,
      quantity?: string,
      commentCount: number,
      media?: {
        id: number,
        postId: number,
        path: string,
      }
    }],
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  }];
  hotelPost?: [{
    id: number,
    userId: number,
    categoryId: number,
    title: string,
    body: string,
    status: boolean,
    image: string,
    price: string,
    category: string,
    username: string,
    lastName: string,
    firstName: string,
    commentCount: number,
    media?: [{
      id: number,
      postId: number,
      path: string,
    }],
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  }];
  foodOrderPost?: [{
    id: number,
    userId: number,
    title: string,
    status: number,
    delivery: number,
    receipt: string,
    username: string,
    phone: string,
    email: string,
    lastName: string,
    firstName: string,
    city: string,
    address: string,
    orders: [{
      id: number,
      userId: number,
      categoryId: number,
      title: string,
      body: string,
      status: number,
      image: string,
      price: string,
      category: string,
      username: string,
      lastName: string,
      firstName: string,
      quantity?: string,
      commentCount: number,
      media?: {
        id: number,
        postId: number,
        path: string,
      }
    }],
    createdAt:  Date,
    updatedAt:  Date,
    deletedAt: Date,
  }];
  foodPost?: [{
    id: number,
    userId: number,
    categoryId: number,
    title: string,
    body: string,
    status: boolean,
    image: string,
    price: string,
    category: string,
    username: string,
    lastName: string,
    firstName: string,
    media?: [{
      id: number,
      postId: number,
      path: string,
    }],
    createdAt:  Date,
    updatedAt:  Date,
    deletedAt:  Date,
  }];
  visitorPost?: [{
    id: number,
    ip: string,
    country: string,
    city: string,
    lang: string,
    lat: string,
    os: string,
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }];
  userPost?: [{
    id: number,
    email: string,
    username: string,
    status_message: string,
    status: number,
    active: number,
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    firstName: string,
    lastName: string,
    image: string,
    gender: number,
    birthday: string,
    country: string,
    city: string,
    address: string,
    phone: string,
    group: string,
  }];
  requestPost?: [{
    id: number,
    userId: number,
    categoryId: number,
    title: string,
    body: string,
    status: number,
    category: string,
    language: string,
    username: string,
    lastName: string,
    firstName: string,
    replyCount: number,
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }];
  newsPost?: [{
    id: number,
    userId: number,
    categoryId: number,
    subCategoryId: number,
    title: string,
    body: string,
    status: number,
    picture: string,
    category: string,
    subCategory: string,
    username: string,
    lastName: string,
    firstName: string,
    commentCount: number,
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }];
  contactPost?: [{
    id: number,
    title: string,
    name: string,
    email: string,
    message: string,
    reply: string,
    phone: number,
    status: number,
    media?: [{
      id: number,
      contactId: number,
      path: string,
    }]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date

  }];

  countPost?:{
    users:number,
    contacts:number,
    requests:number,
    visitors:number,
    news:number,
    orders:number,
    rooms: number,
    foods: number,
  };

}

export interface IPropsOverView extends IPropsCommon {
  _query: (argument: string | number | object | null) => any;
  overViewRows: IOverView;

}

export interface IStateOerView extends  IStateCommon{
}