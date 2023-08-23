import {QUERY_ARGUMENT_RESET,QUERY_ARGUMENT_REMOVE, QUERY_ARGUMENT_EDIT,QUERY_ARGUMENT_NEW} from "../actions/query.argument.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";

const initializeQueryArgument:any = [];

export default function queryArgumentReducer(state = initializeQueryArgument, action:IReduxAction):any {
    switch (action.type) {
        case QUERY_ARGUMENT_NEW:
            return [
                {
                    ...action.payload
                },
                ...state];

        case QUERY_ARGUMENT_REMOVE:

            return state.filter((id:number) => id == action.payload.id);

        case QUERY_ARGUMENT_EDIT:

            return state.map((id: number) => id == action.payload.id) ? {...action.payload} : action.payload;

        case QUERY_ARGUMENT_RESET:
            return [];

        default:
            return state;
    }
}
