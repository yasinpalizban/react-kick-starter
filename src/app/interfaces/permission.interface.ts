import {IPropsCommon} from "./props.common.interface";
import {Permission} from "../models/permission.model";
import {IResponseObject} from "./iresponse.object";
import {IBasic} from "./ibasic";

export interface IPermission extends  IBasic {

    name: string,
    active: boolean,
    description: string,
}

export interface IPropsPermission extends IPropsCommon {
  _retrieve: (argument: string | number | object | null) => Promise<void>;
  _detail: (argument: number) => Promise<void>;
  _save: (group: Permission, props: IPropsCommon) => Promise<void>;
  _update: (group: Permission, props: IPropsCommon) => Promise<void>;
  _remove: (id: number, index: number) => Promise<void>;
  _newQueryArgument: (queryArgument: any) => void;
  permission: IResponseObject<IPermission>;
  permissionList: IResponseObject<IPermission[]>;
}

