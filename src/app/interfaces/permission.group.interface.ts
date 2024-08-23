import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";
import {PermissionGroup} from "../models/permission.group.model";
import {IGroup} from "./group.interface";
import {IPermission} from "./permission.interface";
import {IResponseObject} from "./iresponse.object";
import {IBasic} from "./ibasic";

export interface IPermissionGroup  extends  IBasic {
    permissionId: number,
    groupId: number,
    actions: string,
    permission: string,
    group: string,
}

export interface IPropsPermissionGroup extends IPropsCommon {
  _retrieve: (argument: string | number | object | null) => Promise<void>;
  _detail: (argument:  number ) => Promise<void>;
  _save: ( permissionGroup: PermissionGroup, props: IPropsCommon) => Promise<void>;
  _update: ( PermissionGroup: PermissionGroup, props: IPropsCommon) => Promise<void>;
  _remove: (id: number, index: number) => Promise<void>;
  _newQueryArgument: (queryArgument: any) => void;
  _groupRetrieve: (argument: string | number | object | null) => Promise<void>;
  _permissionRetrieve: (argument: string | number | object | null) => Promise<void>;
  permissionGroup: IResponseObject<IPermissionGroup>;
  permissionGroupList: IResponseObject<IPermissionGroup[]>;
  groupList:IResponseObject<IGroup[]>;
  permissionList:IResponseObject<IPermission[]>;
}
