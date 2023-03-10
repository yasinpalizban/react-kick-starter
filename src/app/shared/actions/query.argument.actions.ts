
export const QUERY_ARGUMENT_NEW = 'QUERY_ARGUMENT_NEW';
export const QUERY_ARGUMENT_REMOVE = 'QUERY_ARGUMENT_REMOVE';
export const QUERY_ARGUMENT_EDIT = 'QUERY_ARGUMENT_EDIT';
export const QUERY_ARGUMENT_RESET = 'QUERY_ARGUMENT_RESET';


export function newQueryArgument(queryArgument:any, dispatch:any) {

    dispatch({
        type: QUERY_ARGUMENT_NEW,
        payload: queryArgument
    });

}

export function removeQueryArgument(queryArgument:any, dispatch:any) {

    dispatch({
        type: QUERY_ARGUMENT_REMOVE,
        payload: queryArgument
    });

}

export function resetQueryArgument(dispatch:any) {

    dispatch({
        type: QUERY_ARGUMENT_RESET
    });

}

export function editQueryArgument(queryArgument:any,dispatch:any) {

    dispatch({
        type: QUERY_ARGUMENT_EDIT,
        payload:queryArgument
    });

}









