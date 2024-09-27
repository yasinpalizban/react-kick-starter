import {IReduxDispatch} from "../interfaces/redux.type.interface";

export const SHARE_ID_NEW = 'SHARE_ID_NEW';
export const SHARE_ID_RESET = 'SHARE_ID_RESET';


export function shareIdNew(dispatch: IReduxDispatch,id:number) {

    dispatch({
        type: SHARE_ID_NEW,
        payload: id
    });

}


export function shareIdReset(dispatch: IReduxDispatch) {

    dispatch({
        type: SHARE_ID_RESET,
        payload:0
    });

}










