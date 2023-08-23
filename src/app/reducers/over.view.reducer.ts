import {OVERVIEW_GET } from "../actions/over.view.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IOverView} from "../interfaces/over.view.interface";

const initialize :IOverView = {};

export default  function overViewReducer(state = initialize, action:IReduxAction):IOverView {
    switch (action.type) {
        case OVERVIEW_GET:
            return {
                ...state,
                 ...action.payload
            }

        default:
            return state;
    }
}

