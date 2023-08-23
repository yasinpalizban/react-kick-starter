import {IReduxAction} from "../interfaces/redux.type.interface";
import {SHARE_ID_NEW, SHARE_ID_RESET} from "../actions/share.id.actions";

const initializeShareId: number = 0;

export default function shareIdReducer(state = initializeShareId, action: IReduxAction): number {
    switch (action.type) {
        case SHARE_ID_NEW:
            state = action.payload;
            return state;
        case SHARE_ID_RESET:
            state = action.payload;
            return state;
        default:
            return state;
    }
}
