import {IPagination} from "./pagination.interface";
import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";
import {PermissionGroup} from "../models/permission.group.model";
import {IGroup} from "./group.interface";
import {IPermission} from "./permission.interface";

export interface IPermissionGroup {


  pager?:IPagination;
  data?: [{
    id: number,
    permissionId: number,
    groupId: number,
    actions: string,
    permission: string,
    group: string,
  }];

}

export interface IPropsPermissionGroup extends IPropsCommon {
  _query: (argument: string | number | object | null) => Promise<void>;
  _save: ( permissionGroup: PermissionGroup, props: IPropsCommon) => Promise<void>;
  _update: ( PermissionGroup: PermissionGroup, props: IPropsCommon) => Promise<void>;
  _remove: (id: number, index: number) => Promise<void>;
  _newQueryArgument: (queryArgument: any) => void;
  _groupQuery: (argument: string | number | object | null) => Promise<void>;
  _permissionQuery: (argument: string | number | object | null) => Promise<void>;
  permissionGroupDetail: IPermissionGroup;
  permissionGroupRows: IPermissionGroup;
  groupRows:IGroup;
  permissionRows:IPermission;
}

export interface IStatePermissionGroup extends IStateCommon{
  isDelete?: boolean;
  isGet?: boolean;
  isPost?: boolean;
  isPut?: boolean;
  isCheck?: boolean;
}