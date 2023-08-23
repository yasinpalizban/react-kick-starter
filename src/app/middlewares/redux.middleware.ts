
// @ts-ignore
const reduxMiddleWare = ({dispatch, getState}) => (next:any) => (action: any) => {
   // console.log('redux middleware');
    // if( localStorage.getItem('user') && !getState().auth){
    // console.log('not sett');
    // }
    next(action);
}
export default reduxMiddleWare;