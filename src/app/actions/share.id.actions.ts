
export const SHARE_ID_NEW = 'SHARE_ID_NEW';
export const SHARE_ID_RESET = 'SHARE_ID_RESET';


export function shareIdNew(id:number, dispatch:any) {

    dispatch({
        type: SHARE_ID_NEW,
        payload: id
    });

}


export function shareIdReset(dispatch:any) {

    dispatch({
        type: SHARE_ID_RESET,
        payload:0
    });

}










