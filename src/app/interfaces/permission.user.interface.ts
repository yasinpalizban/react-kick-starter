import {IPropsCommon} from "./props.common.interface";
import {PermissionUser} from "../models/permission.user.model";
import {IPermission} from "./permission.interface";
import {IUser} from "./user.interface";
import {IGroup} from "./group.interface";
import {IResponseObject} from "./iresponse.object";
import {IBasic} from "./ibasic";

export interface IPermissionUser extends  IBasic {

    permissionId: number,
    userId: number,
    actions: string,
    permission: string,
    username: string,
    firstName: string,
    lastName: string,
}
export interface IPropsPermissionUser extends IPropsCommon {
  _retrieve: (argument: string | number | object | null) => Promise<void>;
  _detail: (argument:  number) => Promise<void>;
  _save: (permissionGroup: PermissionUser, props: IPropsCommon) => Promise<void>;
  _update: (permissionGroup: PermissionUser, props: IPropsCommon) => Promise<void>;
  _remove: (id: number, index: number) => Promise<void>;
  _newQueryArgument: (queryArgument: any) => void;
  _userRetrieve: (argument: string | number | object | null) => Promise<void>;
  _permissionRetrieve: (argument: string | number | object | null) => Promise<void>;
  _groupRetrieve: (argument: string | number | object | null) => Promise<void>;
  permissionUser: IResponseObject<IPermissionUser>;
  permissionUserList: IResponseObject<IPermissionUser[]>;
  userList:IResponseObject<IUser[]>;
  groupList:IResponseObject<IGroup[]>;
  permissionList:IResponseObject<IPermission[]>;
}

