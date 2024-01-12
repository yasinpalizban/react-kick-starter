
import {GRAPH_GET, GRAPH_POST} from "../actions/graph.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IGraph} from "../interfaces/graph.interface";
import {IResponseObject} from "../interfaces/iresponse.object";

const initialize:IResponseObject<IGraph> = {};

export default  function graphReducer(state = initialize, action:IReduxAction):IResponseObject<IGraph> {
    switch (action.type) {
        case GRAPH_GET:
            return {
                ...state,
                 ...action.payload
            }
        case  GRAPH_POST:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

