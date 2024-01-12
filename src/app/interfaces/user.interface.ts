import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";
import {IGroup} from "./group.interface";
import {User} from "../models/user.model";
import {IResponseObject} from "./iresponse.object";
import {IBasic} from "./ibasic";

export interface IUser extends  IBasic {

    email: string,
    username: string,
    status_message: string,
    status: boolean,
    active: boolean,
    createdAt:  Date,
    updatedAt:  Date,
    deletedAt:  Date,
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
    groupId?: number,
}


export interface IPropsUser extends IPropsCommon {
  _retrieve: (argument: string | number | object | null) => Promise<void>;
  _detail: (argument: number) => Promise<void>;
  _save: (user: User, props: IPropsCommon) => Promise<void>;
  _update: (user: User, props: IPropsCommon) => Promise<void>;
  _remove: (id: number, index: number) => Promise<void>;
  _newQueryArgument: (queryArgument: any) => void;
  _groupRetrieve:(argument: string | number | object | null)=> Promise<void>;
  user: IResponseObject<IUser>;
  userList: IResponseObject<IUser[]>;
  groupList: IResponseObject<IGroup[]>;
}

export interface IStateUser extends  IStateCommon{
}
