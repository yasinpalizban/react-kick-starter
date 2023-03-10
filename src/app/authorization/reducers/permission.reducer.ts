import {PERMISSION_DELETE, PERMISSION_POST, PERMISSION_GET, PERMISSION_PUT} from "../actions/permission.actions";
import {IReduxAction} from "../../shared/interfaces/redux.type.interface";
import {IPermission} from "../interfaces/permission.interface";

const initialize:IPermission = {};

export default function permissionReducer(state = initialize, action:IReduxAction):IPermission {
    switch (action.type) {
        case PERMISSION_GET:
            return {
                ...state,
                ...action.payload
            }
        case PERMISSION_POST: {
            const temp:any = [...state.data!, action.payload];
            return {
                ...state,
                data: temp
            }
        }

        case PERMISSION_PUT: {
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

