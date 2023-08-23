import {get, post} from "../services/api.service";
import {Graph} from "../models/graph.model";
import {IGraph} from "../interfaces/graph.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";

export const GRAPH_GET = 'GRAPH_GET';
export const GRAPH_POST = 'GRAPH_POST';

export async function query(argument: string | number | object | null, dispatch:IReduxDispatch) {
    const result = await get<IGraph>('graph',argument);

    dispatch({
        type: GRAPH_GET,
        payload: result
    });

}

export async function save(graph:Graph, dispatch:IReduxDispatch) {
    const result = await post<IGraph>('graph', graph);

    dispatch({
        type: GRAPH_POST,
        payload: result
    });

}



