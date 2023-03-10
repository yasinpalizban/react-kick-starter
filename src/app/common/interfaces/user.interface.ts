import {IPagination} from "../../shared/interfaces/pagination.interface";
import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {IStateCommon} from "../../shared/interfaces/state.common.interface";
import {IGroup} from "../../authorization/interfaces/group.interface";
import {User} from "../models/user.model";

export interface IUser {

  pager?:IPagination;
  data?: [{
    id: number,
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
  }];

}


export interface IPropsUser extends IPropsCommon {
  _query: (argument: string | number | object | null) => void;
  _save: (user: User, props: IPropsCommon) => void;
  _update: (user: User, props: IPropsCommon) => void;
  _remove: (id: number, index: number) => void;
  _newQueryArgument: (queryArgument: any) => void;
  _groupQuery:(argument: string | number | object | null)=>void;
  userDetail: IUser;
  userRows: IUser;
  groupRows: IGroup;
}

export interface IStateUser extends  IStateCommon{
}
