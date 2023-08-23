import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";
import {IGroup} from "./group.interface";
import {Graph} from "../models/graph.model";

export interface IGraph {

  data?: [{
    name: string,
    value: string,
  }];


}

export interface IPropsGraph extends IPropsCommon {
  _query: (argument: string | number | object | null) => Promise<void>;
  _save: (group: Graph) => Promise<void>;
  _alert: (error: any) => void;
  graphData: IGraph;
}

export interface IStateGraph extends  IStateCommon{
}