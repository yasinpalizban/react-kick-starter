import {USER_DELETE, USER_POST, USER_GET, USER_PUT} from "../actions/user.actions";
import {IReduxAction} from "../../shared/interfaces/redux.type.interface";
import {IUser} from "../interfaces/user.interface";

const initialize:IUser = {};

export default function userReducer(state = initialize, action: IReduxAction):IUser {
    switch (action.type) {
        case USER_GET:
            return {
                ...state,
                ...action.payload
            }
        case USER_POST: {
            const temp:any = [...state.data!, action.payload];
            return {
                ...state,
                data: temp
            }
        }

        case USER_PUT: {
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
        USER_DELETE: {
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

