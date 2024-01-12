import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";

export interface IToast{
  message: string;
  name: string;
  time: string;
}
export interface IPropsToast extends IPropsCommon {
  _removeToast: ()=> void;
  toast:IToast;
}

export interface IStateToast extends  IStateCommon{
}
