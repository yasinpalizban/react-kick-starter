import {get, post} from "../services/api.service";
import {Graph} from "../models/graph.model";
import {IGraph} from "../interfaces/graph.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {GRAPH_SERVICE} from "../configs/path.constants";

export const GRAPH_GET = 'GRAPH_GET';
export const GRAPH_POST = 'GRAPH_POST';

export async function retrieve(argument: string | number | object | null, dispatch:IReduxDispatch) {
    const result = await get<IGraph>(GRAPH_SERVICE.base,argument);

    dispatch({
        type: GRAPH_GET,
        payload: result
    });

}

export async function save(graph:Graph, dispatch:IReduxDispatch) {
    const result = await post<IGraph>(GRAPH_SERVICE.base, graph);

    dispatch({
        type: GRAPH_POST,
        payload: result
    });

}



