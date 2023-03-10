
import {GRAPH_GET, GRAPH_POST} from "../actions/graph.actions";
import {IReduxAction} from "../../shared/interfaces/redux.type.interface";
import {IGraph} from "../interfaces/graph.interface";

const initialize:IGraph = {};

export default  function graphReducer(state = initialize, action:IReduxAction):IGraph {
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

