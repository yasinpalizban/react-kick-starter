import {IPagination} from "../../shared/interfaces/pagination.interface";
import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {IStateCommon} from "../../shared/interfaces/state.common.interface";
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
  _query: (argument: string | number | object | null) => void;
  _save: (setting: Setting, props: IPropsCommon) => void;
  _update: (setting: Setting, props: IPropsCommon) => void;
  _remove: (id: number, index: number) => void;
  _newQueryArgument: (queryArgument: any) => void;
  settingDetail: ISetting;
  settingRows: ISetting;
}

export interface IStateSetting extends  IStateCommon{
}
