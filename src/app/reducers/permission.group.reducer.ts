import {GROUP_PERMISSION_DELETE, GROUP_PERMISSION_POST, GROUP_PERMISSION_GET, GROUP_PERMISSION_PUT} from "../actions/permission..group.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IPermissionGroup} from "../interfaces/permission.group.interface";

const initialize:IPermissionGroup = {};

export default function permissionGroupReducer(state = initialize, action:IReduxAction): IPermissionGroup{
    switch (action.type) {
        case GROUP_PERMISSION_GET:
            return {
                ...state,
                ...action.payload
            }
        case GROUP_PERMISSION_POST: {
            const temp:any = [...state.data!, action.payload];
            return {
                ...state,
                data: temp
            }
        }

        case GROUP_PERMISSION_PUT: {
            const temp:any = state.data?.map((data:any) => {
                    if (data.id == action.payload.id) {
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
        GROUP_PERMISSION_DELETE: {
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

