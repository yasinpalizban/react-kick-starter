import {GROUP_DELETE, GROUP_POST, GROUP_GET, GROUP_PUT} from "../actions/group.actions";
import {IReduxAction} from "../../shared/interfaces/redux.type.interface";
import {IGroup} from "../interfaces/group.interface";

const initialize:IGroup = {};

export default function groupReducer(state = initialize, action:IReduxAction):IGroup {
    switch (action.type) {
        case GROUP_GET:
            return {
                ...state,
                ...action.payload
            }
        case GROUP_POST: {
            const temp:any = [...state.data!, action.payload];
            return {
                ...state,
                data: temp
            }
        }

        case GROUP_PUT: {
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
        GROUP_DELETE: {
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

