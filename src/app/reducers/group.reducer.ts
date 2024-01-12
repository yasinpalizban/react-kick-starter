import {GROUP_DELETE, GROUP_POST, GROUP_GET, GROUP_PUT, GROUP_SHOW} from "../actions/group.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IGroup} from "../interfaces/group.interface";
import {IResponseObject} from "../interfaces/iresponse.object";
import {isEmpty} from "../utils/is.empty";

const initialize: IResponseObject<IGroup[]> = {};

export function groupReducer(state = initialize, action: IReduxAction): IResponseObject<IGroup[]> {
    switch (action.type) {
        case GROUP_GET:
            return {
                ...state,
                ...action.payload
            }
        case GROUP_POST: {

            const temp = isEmpty(state) || isEmpty(state.data!) ? [action.payload] : [...state?.data!, action.payload];
            return {...state, data: temp}

        }

        case GROUP_PUT: {

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
        GROUP_DELETE: {
            const temp: any = state.data;
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
const initializeSelect: IResponseObject< IGroup> = {};

export function groupSelectReducer(state = initializeSelect, action: IReduxAction): IResponseObject<IGroup> {
    switch (action.type) {
        case GROUP_SHOW:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

