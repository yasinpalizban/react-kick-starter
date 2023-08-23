import {SPINNER_SHOW, SPINNER_HIDE} from "../actions/spinner.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";

const initializeSpinner:boolean = false;

export default function alertSpinner(state = initializeSpinner, action:IReduxAction):boolean {
    switch (action.type) {

        case SPINNER_SHOW: {

            state = action.payload
            return state;

        }

        case SPINNER_HIDE: {
            state = action.payload
            return state;
        }


        default:
            return state;
    }
}
