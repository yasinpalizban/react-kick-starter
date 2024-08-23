import {IPropsCommon} from "./props.common.interface";
import {Setting} from "../models/setting.model";
import {IResponseObject} from "./iresponse.object";
import {IBasic} from "./ibasic";

export interface ISetting  extends  IBasic{
    key: string,
    value: string,
    description: string,
    status: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}


export interface IPropsSetting extends IPropsCommon {
  _retrieve: (argument: string | number | object | null) => Promise<void>;
  _detail: (argument: number) => Promise<void>;
  _save: (setting: Setting, props: IPropsCommon) => Promise<void>;
  _update: (setting: Setting, props: IPropsCommon) => Promise<void>;
  _remove: (id: number, index: number) => Promise<void>;
  _newQueryArgument: (queryArgument: any) => void;
  setting: IResponseObject<ISetting>;
  settingList: IResponseObject<ISetting[]>;
}

