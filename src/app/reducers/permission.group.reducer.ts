import {
    GROUP_PERMISSION_DELETE,
    GROUP_PERMISSION_POST,
    GROUP_PERMISSION_GET,
    GROUP_PERMISSION_PUT,
    GROUP_PERMISSION_SHOW
} from "../actions/permission..group.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IPermissionGroup} from "../interfaces/permission.group.interface";
import {IResponseObject} from "../interfaces/iresponse.object";
import {isEmpty} from "../utils/is.empty";

const initialize:IResponseObject<IPermissionGroup[]> = {};

export function permissionGroupReducer(state = initialize, action:IReduxAction): IResponseObject<IPermissionGroup[]>{
    switch (action.type) {
        case GROUP_PERMISSION_GET:
            return {
                ...state,
                ...action.payload
            }
        case GROUP_PERMISSION_POST: {

            const temp = isEmpty(state) || isEmpty(state.data!) ? [action.payload] : [...state?.data!, action.payload];
            return {...state, data: temp}
        }

        case GROUP_PERMISSION_PUT: {

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

const initializeSelect:IResponseObject<IPermissionGroup> = {};

export function permissionGroupSelectReducer(state = initializeSelect, action:IReduxAction): IResponseObject< IPermissionGroup>{
    switch (action.type) {
        case GROUP_PERMISSION_SHOW:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
