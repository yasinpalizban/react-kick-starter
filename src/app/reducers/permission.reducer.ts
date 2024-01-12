import {
    PERMISSION_DELETE,
    PERMISSION_POST,
    PERMISSION_GET,
    PERMISSION_PUT,
    PERMISSION_SHOW
} from "../actions/permission.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IPermission} from "../interfaces/permission.interface";
import {IResponseObject} from "../interfaces/iresponse.object";
import {isEmpty} from "../utils/is.empty";

const initialize: IResponseObject<IPermission[]> = {};

export  function permissionReducer(state = initialize, action:IReduxAction):IResponseObject<IPermission[]> {
    switch (action.type) {
        case PERMISSION_GET:
            return {
                ...state,
                ...action.payload
            }
        case PERMISSION_POST: {

                const temp = isEmpty(state) || isEmpty(state.data!) ? [action.payload] : [...state?.data!, action.payload];
                return {...state, data: temp}

        }

        case PERMISSION_PUT: {

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
        PERMISSION_DELETE: {
            const temp:any = state.data;
            temp.splice(action.payload, 1);
            return {
                ...state,
                data: temp
            }
        }


        default:
            return state;
    }
}

const initializeSelect: IResponseObject< IPermission> = {};

export function permissionSelectReducer(state = initializeSelect, action:IReduxAction):IResponseObject<IPermission> {
    switch (action.type) {
        case PERMISSION_SHOW:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
