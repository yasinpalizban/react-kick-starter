import {
    HOME_SETTING_GET,
} from "../actions/home.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IHomeSetting} from "../interfaces/home.interface";

const initialize: IHomeSetting = {};

export default function homeReducer(state = initialize, action: IReduxAction): IHomeSetting {
    switch (action.type) {
        case HOME_SETTING_GET:
            state = action.payload;
            return state;

        default:
            return state;
    }
}

