
export const SPINNER_SHOW = 'SPINNER_SHOW';
export const SPINNER_HIDE = 'SPINNER_HIDE';


export function showSpinner( dispatch:any) {

    dispatch({
        type: SPINNER_SHOW,
        payload: true
    });

}


export function hideSpinner( dispatch:any) {

    dispatch({
        type: SPINNER_HIDE,
        payload: false
    });

}







