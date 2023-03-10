import {INewsPost} from "../../common/interfaces/news-post.interface";
import {INewsComment} from "../../common/interfaces/news-comment.interface";
import {INewsCategory} from "../../common/interfaces/news-category.interface";
import {IPropsCommon} from "../../shared/interfaces/props.common.interface";

import {IStateCommon} from "../../shared/interfaces/state.common.interface";

export interface IHome {
  newsPost?: INewsPost,
  newsCategory?: INewsCategory,
  newsComment?: INewsComment,
  viewPost?: {
    banner: [{
      id: number,
      path: string,
      title: string,
      description: string,
      viewOptionId: number
    }],
    restaurant: [{
      id: number,
      path: string,
      title: string,
      description: string,
      viewOptionId: number
    }],
    photo: [{
      id: number,
      path: string,
      title: string,
      description: string,
      viewOptionId: number
    }], about: [{
      id: number,
      path: string,
      title: string,
      description: string,
      viewOptionId: number
    }],
  };
  settingPost?: {
    twitter: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    },
    instagram: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    },
    googlePlus: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    },
    facebook: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    },
    address: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    },
    phone: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    },
    email: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    }, latitude: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    }, longitude: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    }, linkLocation: {
      id: number,
      key: string,
      value: string,
      description: string,
      status: number,
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    },
  };


  advertisementPost?: {
    sideOne: {
      id: number,
      name: string,
      link: string,
      description: string,
      status: number,
      media?: [{
        id: number,
        advertisementId: number,
        path: string,
      }]
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    },
    sideTwo: {
      id: number,
      name: string,
      link: string,
      description: string,
      status: number,
      media?: [{
        id: number,
        advertisementId: number,
        path: string,
      }]
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    }, sideThree: {
      id: number,
      name: string,
      link: string,
      description: string,
      status: number,
      media?: [{
        id: number,
        advertisementId: number,
        path: string,
      }]
      createdAt: { date: Date, timezone: string, timezone_type: number },
      updatedAt: { date: Date, timezone: string, timezone_type: number },
      deletedAt: { date: Date, timezone: string, timezone_type: number },
    },

  },

}

export interface IPropsHome extends IPropsCommon {

}

export interface IStateHome extends  IStateCommon{
}