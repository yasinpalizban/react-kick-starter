import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {IStateCommon} from "../../shared/interfaces/state.common.interface";
import {IGroup} from "../../authorization/interfaces/group.interface";
import {Graph} from "../models/graph.model";

export interface IGraph {

  data?: [{
    name: string,
    value: string,
  }];


}

export interface IPropsGraph extends IPropsCommon {
  _query: (argument: string | number | object | null) => any;
  _save: (group: Graph) => any;
  _error: (error: any) => void;
  graphData: IGroup;
}

export interface IStateGraph extends  IStateCommon{
}