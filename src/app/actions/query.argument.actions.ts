import {IReduxDispatch} from "../interfaces/redux.type.interface";

export const QUERY_ARGUMENT_NEW = 'QUERY_ARGUMENT_NEW';
export const QUERY_ARGUMENT_REMOVE = 'QUERY_ARGUMENT_REMOVE';
export const QUERY_ARGUMENT_EDIT = 'QUERY_ARGUMENT_EDIT';
export const QUERY_ARGUMENT_RESET = 'QUERY_ARGUMENT_RESET';


export function newQueryArgument(dispatch: IReduxDispatch,queryArgument:any) {

    dispatch({
        type: QUERY_ARGUMENT_NEW,
        payload: queryArgument
    });

}

export function removeQueryArgument(dispatch: IReduxDispatch,queryArgument:any) {

    dispatch({
        type: QUERY_ARGUMENT_REMOVE,
        payload: queryArgument
    });

}

export function resetQueryArgument(dispatch: IReduxDispatch) {

    dispatch({
        type: QUERY_ARGUMENT_RESET
    });

}

export function editQueryArgument(dispatch: IReduxDispatch,queryArgument:any) {

    dispatch({
        type: QUERY_ARGUMENT_EDIT,
        payload:queryArgument
    });

}









