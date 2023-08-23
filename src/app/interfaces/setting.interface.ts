import {IPagination} from "./pagination.interface";
import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";
import {Setting} from "../models/setting.model";

export interface ISetting {

  pager?:IPagination;
  data?: [{
    id: number,
    key: string,
    value: string,
    description: string,
    status: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  }];

}


export interface IPropsSetting extends IPropsCommon {
  _query: (argument: string | number | object | null) => Promise<void>;
  _save: (setting: Setting, props: IPropsCommon) => Promise<void>;
  _update: (setting: Setting, props: IPropsCommon) => Promise<void>;
  _remove: (id: number, index: number) => Promise<void>;
  _newQueryArgument: (queryArgument: any) => void;
  settingDetail: ISetting;
  settingRows: ISetting;
}

export interface IStateSetting extends  IStateCommon{
}