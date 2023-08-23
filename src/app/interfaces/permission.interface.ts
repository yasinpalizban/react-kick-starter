import {IPagination} from "./pagination.interface";
import {IPropsCommon} from "./props.common.interface";
import {Permission} from "../models/permission.model";
import {IStateCommon} from "./state.common.interface";

export interface IPermission {


  pager?:IPagination;
  data?: [{
    id: number,
    name: string,
    active: boolean,
    description: string,
  }];

}

export interface IPropsPermission extends IPropsCommon {
  _query: (argument: string | number | object | null) => Promise<void>;
  _save: (group: Permission, props: IPropsCommon) => Promise<void>;
  _update: (group: Permission, props: IPropsCommon) => Promise<void>;
  _remove: (id: number, index: number) => Promise<void>;
  _newQueryArgument: (queryArgument: any) => void;
  permissionDetail: IPermission;
  permissionRows: IPermission;
}

export interface IStatePermission extends IStateCommon{

}