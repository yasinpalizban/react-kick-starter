import {IPropsCommon} from "./props.common.interface";
import {Graph} from "../models/graph.model";
import {IResponseObject} from "./iresponse.object";

export interface IGraph {
    name: string,
    value: string,

}

export interface IPropsGraph extends IPropsCommon {
  _retrieve: (argument: string | number | object | null) => Promise<void>;
  _save: (group: Graph) => Promise<void>;
  _alert: (error: any) => void;
  graphData: IResponseObject<IGraph[]>;
}

