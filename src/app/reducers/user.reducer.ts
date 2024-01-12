import {USER_DELETE, USER_POST, USER_GET, USER_PUT, USER_SHOW} from "../actions/user.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IUser} from "../interfaces/user.interface";
import {isEmpty} from "../utils/is.empty";
import {IResponseObject} from "../interfaces/iresponse.object";

const initialize: IResponseObject<IUser[]> = {};

export  function userReducer(state = initialize, action: IReduxAction): IResponseObject<IUser[]> {
    switch (action.type) {
        case USER_GET:
            return {...state, ...action.payload}
        case USER_POST: {

            const temp = isEmpty(state) || isEmpty(state.data!) ? [action.payload] : [...state?.data!, action.payload];
            return {...state, data: temp}

        }

        case USER_PUT: {

            const temp = state.data?.map((data) => {
                    if (data.id == action.payload.id) {
                        data = Object.assign({...data, ...action.payload})
                    }
                    return data;
                }
            );
            return {...state, data: temp}


        }
        case
        USER_DELETE: {
            const temp: any = state.data;
            temp?.splice(action.payload, 1);
            return {...state, data: temp}
        }
        default:
            return state;
    }
}


const initializeSelect: IResponseObject<IUser> = {};

export function userSelectReducer(state = initializeSelect, action: IReduxAction): IResponseObject<IUser> {
    switch (action.type) {
        case USER_SHOW:
            return {...state, ...action.payload}

        default:
            return state;
    }
}
