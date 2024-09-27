import {IReduxDispatch} from "../interfaces/redux.type.interface";

export const SPINNER_SHOW = 'SPINNER_SHOW';
export const SPINNER_HIDE = 'SPINNER_HIDE';


export function showSpinner( dispatch: IReduxDispatch) {

    dispatch({
        type: SPINNER_SHOW,
        payload: true
    });

}


export function hideSpinner( dispatch: IReduxDispatch) {

    dispatch({
        type: SPINNER_HIDE,
        payload: false
    });

}







