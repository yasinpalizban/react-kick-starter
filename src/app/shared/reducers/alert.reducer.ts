import {ALERT_NEW, ALERT_REMOVE, ALERT_EDIT, ALERT_RESET} from "../actions/alert.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";

const initializeAlert:any = [];

export default function alertReducer(state = initializeAlert, action:IReduxAction):any {
    switch (action.type) {
        case ALERT_NEW:
            return [
                {
                    // id : action.payload.id,
                    // alertOptions : {
                    //     autoClose: action.payload.alertOptions.autoClose,
                    //     keepAfterRouteChange: action.payload.alertOptions.keepAfterRouteChange,
                    //     body: action.payload.alertOptions.body
                    // },
                    // type:action.payload.type,
                    // message:action.payload.message
                    ...action.payload
                },
                ...state];

        case ALERT_REMOVE:

            return state.filter((id:number) => id === action.payload.id);

        case ALERT_EDIT:

            return state.map((id:number) => id === action.payload.id) ? {...action.payload} : action.payload;

        case ALERT_RESET:
            return [];

        default:
            return state;
    }
}
