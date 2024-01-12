
import {IReduxAction} from "../interfaces/redux.type.interface";
import {TOAST_NEW, TOAST_REMOVE} from "../actions/toast.actions";

const initializeToast:any = {};

export default function toastReducer(state = initializeToast, action:IReduxAction):any {
    switch (action.type) {
        case TOAST_NEW:
            return {...state, ...action.payload}
        case TOAST_REMOVE:
            return {};
        default:
            return state;
    }
}
