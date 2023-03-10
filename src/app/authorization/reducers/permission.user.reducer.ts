import {USER_PERMISSION_DELETE, USER_PERMISSION_POST, USER_PERMISSION_GET, USER_PERMISSION_PUT} from "../actions/permission.user.actions";
import {IReduxAction} from "../../shared/interfaces/redux.type.interface";
import {IPermissionUser} from "../interfaces/permission.user.interface";

const initialize:IPermissionUser = {};

export default function permissionUserReducer(state = initialize, action: IReduxAction):IPermissionUser {
    switch (action.type) {
        case USER_PERMISSION_GET:
            return {
                ...state,
                ...action.payload
            }
        case USER_PERMISSION_POST: {
            const temp:any = [...state.data!, action.payload];
            return {
                ...state,
                data: temp
            }
        }

        case USER_PERMISSION_PUT: {
            const temp:any = state.data?.map((data:any) => {
                    if (data.id === action.payload.id) {
                        data = Object.assign({...data, ...action.payload})
                    }
                    return data;
                }
            );
            return {
                ...state,
                data: temp
            }
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

