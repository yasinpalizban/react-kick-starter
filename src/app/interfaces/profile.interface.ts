import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";
import {Profile} from "../models/profile.model";
import {IResponseObject} from "./iresponse.object";
import {IBasic} from "./ibasic";

export interface IProfile  extends  IBasic{
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

}



export interface IPropsProfile extends IPropsCommon {
  _retrieve: () => Promise<void>;
  _save: (profile: Profile|FormData, props:IPropsCommon) => Promise<void>;
  _resetAlert:()=>void;
  profile: IResponseObject<IProfile>;

}

export interface IStateProfile extends  IStateCommon{
  image?:any
}
