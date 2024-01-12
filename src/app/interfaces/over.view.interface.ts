import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";
import {IUser} from "./user.interface";
import {IResponseObject} from "./iresponse.object";


export interface IOverView {
  userPost?: IUser[]
  countPost?:{
    users:number,
    news:number,
    contacts:number,
    visitors:number,
  };

}

export interface IPropsOverView extends IPropsCommon {
  _retrieve: (argument: string | number | object | null) => Promise<void>;
  overView:  IResponseObject<IOverView>;
}

export interface IStateOerView extends  IStateCommon{
}
