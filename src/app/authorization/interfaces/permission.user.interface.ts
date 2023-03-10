import {IPagination} from "../../shared/interfaces/pagination.interface";
import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {Permission} from "../models/permission.model";
import {IStateCommon} from "../../shared/interfaces/state.common.interface";
import {PermissionUser} from "../models/permission.user.model";
import {IPermission} from "./permission.interface";
import {IUser} from "../../common/interfaces/user.interface";

export interface IPermissionUser {

  pager?:IPagination;
  data?: [{
    id: number,
    permissionId: number,
    userId: number,
    actions: string,
    permission: string,
    username: string,
    firstName: string,
    lastName: string,
  }];

}
export interface IPropsPermissionUser extends IPropsCommon {
  _query: (argument: string | number | object | null) => void;
  _save: (permissionGroup: PermissionUser, props: IPropsCommon) => void;
  _update: (permissionGroup: PermissionUser, props: IPropsCommon) => void;
  _remove: (id: number, index: number) => void;
  _newQueryArgument: (queryArgument: any) => void;
  _userQuery: (argument: string | number | object | null) => void;
  _permissionQuery: (argument: string | number | object | null) => void;
  permissionUserDetail: IPermissionUser;
  permissionUserRows: IPermissionUser;
  userRows:IUser;
  permissionRows:IPermission;
}

export interface IStatePermissionUser extends IStateCommon{
  isDelete?: boolean;
  isGet?: boolean;
  isPost?: boolean;
  isPut?: boolean;
  isCheck?: boolean;
}