import {HOME_GET} from "../actions/home.actions";
import {IReduxAction} from "../../shared/interfaces/redux.type.interface";
import {IHome} from "../interfaces/home.interface";

const initialize:IHome = {};

export default function homeReducer(state = initialize, action:IReduxAction):IHome {
    switch (action.type) {
        case HOME_GET:
            return {
                ...state,
                ...action.payload
            }


        default:
            return state;
    }
}

