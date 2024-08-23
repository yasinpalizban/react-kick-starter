import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";

export interface IPropsSearchingField extends IPropsCommon {
  sortData:Array<{ id: string; text: string }>;
  ruleData:Array<{ id: string; text: string }>;
  redirectPath:string;
  listLink: Array<{ link: string, name: string }>
  service:any;
  onClickSearch:any
}

export interface IStateSearchingField  extends  IStateCommon{
  onClickSearch:any;
}
