import {IPagination} from "./pagination.interface";
import {IPropsCommon} from "./props.common.interface";
import {Permission} from "../models/permission.model";
import {IStateCommon} from "./state.common.interface";
import {PermissionUser} from "../models/permission.user.model";
import {IPermission} from "./permission.interface";
import {IUser} from "./user.interface";
import {IGroup} from "./group.interface";

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
  _query: (argument: string | number | object | null) => Promise<void>;
  _save: (permissionGroup: PermissionUser, props: IPropsCommon) => Promise<void>;
  _update: (permissionGroup: PermissionUser, props: IPropsCommon) => Promise<void>;
  _remove: (id: number, index: number) => Promise<void>;
  _newQueryArgument: (queryArgument: any) => void;
  _userQuery: (argument: string | number | object | null) => Promise<void>;
  _permissionQuery: (argument: string | number | object | null) => Promise<void>;
  _groupQuery: (argument: string | number | object | null) => Promise<void>;
  permissionUserDetail: IPermissionUser;
  permissionUserRows: IPermissionUser;
  userRows:IUser;
  groupRows:IGroup;
  permissionRows:IPermission;
}

export interface IStatePermissionUser extends IStateCommon{
  isDelete?: boolean;
  isGet?: boolean;
  isPost?: boolean;
  isPut?: boolean;
  isCheck?: boolean;
}