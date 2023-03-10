import {IPagination} from "../../shared/interfaces/pagination.interface";
import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {Permission} from "../models/permission.model";
import {IStateCommon} from "../../shared/interfaces/state.common.interface";

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
  _query: (argument: string | number | object | null) => void;
  _save: (group: Permission, props: IPropsCommon) => void;
  _update: (group: Permission, props: IPropsCommon) => void;
  _remove: (id: number, index: number) => void;
  _newQueryArgument: (queryArgument: any) => void;
  permissionDetail: IPermission;
  permissionRows: IPermission;
}

export interface IStatePermission extends IStateCommon{

}