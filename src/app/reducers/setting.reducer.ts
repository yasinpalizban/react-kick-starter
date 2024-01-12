import {SETTING_DELETE, SETTING_POST, SETTING_GET, SETTING_PUT, SETTING_SHOW} from "../actions/setting.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {ISetting} from "../interfaces/setting.interface";
import {isEmpty} from "../utils/is.empty";
import {IResponseObject} from "../interfaces/iresponse.object";

const initialize: IResponseObject<ISetting[]> = {};


export  function settingReducer(state = initialize, action: IReduxAction): IResponseObject<ISetting[]> {
    switch (action.type) {
        case SETTING_GET:
            return {...state, ...action.payload}
        case SETTING_POST: {

            const temp = isEmpty(state) || isEmpty(state.data!) ? [action.payload] : [...state?.data!, action.payload];
            return {...state, data: temp}

        }
        case SETTING_PUT: {

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
        SETTING_DELETE: {
            const temp: any = state.data;
            temp?.splice(action.payload, 1);
            return {
                ...state,
                data: temp
            }
        }

        default:
            return state;
    }
}
const initializeSelect: IResponseObject<ISetting> = {};

export function settingSelectReducer(state = initializeSelect, action: IReduxAction): IResponseObject<ISetting> {
    switch (action.type) {
        case SETTING_SHOW:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
