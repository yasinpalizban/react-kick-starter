import {IAlert} from "../interfaces/ialert";
import {IReduxDispatch} from "../interfaces/redux.type.interface";

export const ALERT_NEW = 'ALERT_NEW';
export const ALERT_REMOVE = 'ALERT_REMOVE';
export const ALERT_EDIT = 'ALERT_EDIT';
export const ALERT_RESET = 'ALERT_RESET';


export function newAlert(dispatch:IReduxDispatch,alert:IAlert ) {

    dispatch({
        type: ALERT_NEW,
        payload: alert
    });

}

export function removeAlert( dispatch:IReduxDispatch,alert:IAlert) {

    dispatch({
        type: ALERT_REMOVE,
        payload: alert
    });

}

export function resetAlert(dispatch:IReduxDispatch) {

    dispatch({
        type: ALERT_RESET
    });

}



export function editAlert(dispatch:IReduxDispatch,alert:IAlert) {

    dispatch({
        type: ALERT_EDIT,
        payload: alert
    });

}







