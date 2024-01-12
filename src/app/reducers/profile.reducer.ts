import {PROFILE_GET, PROFILE_POST} from "../actions/profile.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IProfile} from "../interfaces/profile.interface";
import {IResponseObject} from "../interfaces/iresponse.object";

const initialize: IResponseObject<IProfile> = {};

export default function profileReducer(state = initialize, action: IReduxAction): IResponseObject<IProfile> {
    switch (action.type) {
        case PROFILE_GET:
            return {
                ...state,
                ...action.payload
            }
        case PROFILE_POST:
            const temp: any =  Object.assign({...state.data, ...action.payload});
            return {
                ...state,
                data: temp
            }

        default:
            return state;
    }
}

