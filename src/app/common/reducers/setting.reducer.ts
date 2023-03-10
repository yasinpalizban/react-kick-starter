import {SETTING_DELETE, SETTING_POST, SETTING_GET, SETTING_PUT} from "../actions/setting.actions";
import {IReduxAction} from "../../shared/interfaces/redux.type.interface";
import {ISetting} from "../interfaces/setting.interface";

const initialize:ISetting = {};

export default function settingReducer(state = initialize, action:IReduxAction):ISetting {
    switch (action.type) {
        case SETTING_GET:
            return {
                ...state,
                ...action.payload
            }
        case SETTING_POST: {
            const temp:any = [...state.data!, action.payload];
            return {
                ...state,
                data: temp
            }
        }

        case SETTING_PUT: {
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
        SETTING_DELETE: {
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

