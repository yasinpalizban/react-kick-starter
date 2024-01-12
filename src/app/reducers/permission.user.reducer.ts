import {
    USER_PERMISSION_DELETE,
    USER_PERMISSION_POST,
    USER_PERMISSION_GET,
    USER_PERMISSION_PUT,
    USER_PERMISSION_SHOW
} from "../actions/permission.user.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IPermissionUser} from "../interfaces/permission.user.interface";
import {IResponseObject} from "../interfaces/iresponse.object";
import {isEmpty} from "../utils/is.empty";

const initialize:IResponseObject<IPermissionUser[]> = {};

export  function permissionUserReducer(state = initialize, action: IReduxAction):IResponseObject<IPermissionUser[]> {
    switch (action.type) {
        case USER_PERMISSION_GET:
            return {
                ...state,
                ...action.payload
            }
        case USER_PERMISSION_POST: {

                const temp = isEmpty(state) || isEmpty(state.data!) ? [action.payload] : [...state?.data!, action.payload];
                return {...state, data: temp}

        }

        case USER_PERMISSION_PUT: {

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
        USER_PERMISSION_DELETE: {
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

const initializeSelect:IResponseObject<IPermissionUser> = {};

export  function permissionUserSelectReducer(state = initializeSelect, action: IReduxAction):IResponseObject<IPermissionUser> {
    switch (action.type) {
        case USER_PERMISSION_SHOW:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
