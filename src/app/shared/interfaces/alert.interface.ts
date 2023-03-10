import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";

export interface IAlert {
  type?: string,
  message?:string,
  autoClose: boolean;
  keepAfterRouteChange: boolean;
  body: string[];

}
export interface IPropsAlert extends IPropsCommon {
  _removeAlert: (alert: IAlert)=> void;
  alert:IAlert[];
}

export interface IStateAlert extends  IStateCommon{
}
