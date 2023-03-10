import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {IStateCommon} from "../../shared/interfaces/state.common.interface";
import {Profile} from "../models/profile.model";

export interface IProfile {

  data?: {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    image: string,
    address: string;
    country: string,
    city: string,
    gender: string,
    title: string,
    bio: string,
    createdAt:Date
    updatedAt: Date,
    deletedAt:  Date,
  };
}



export interface IPropsProfile extends IPropsCommon {
  _query: (argument: string | number | object | null) => void;
  _save: (profile: Profile|FormData) => void;
  _resetAlert:()=>void;
  profileDetail: IProfile;

}

export interface IStateProfile extends  IStateCommon{
  image?:any
}
