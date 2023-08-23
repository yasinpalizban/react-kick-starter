import axios from './spinner.interceptor';
import ErrorService from "../services/error.service";
import {ErrorInterceptType} from "../enums/error.intercept.enum";

axios.interceptors.response.use(
    res =>{
      //  console.log(res);
        return res;
    } ,
    err => {

        if (err.response.data.type && err.response.data.type === ErrorInterceptType.Login) {
            window.location.href=window.location.origin+'/home/sign-out';
        } else if (err.response.data.type && err.response.data.type === ErrorInterceptType.Permission) {
            window.location.href=window.location.origin+'/403';
        } else if (err.response.data.type && err.response.data.type === ErrorInterceptType.Jwt) {
            window.location.href=window.location.origin+'/home/sign-out';
        } else if (err.response.data.type && err.response.data.type === ErrorInterceptType.Csrf) {
            window.location.href=window.location.origin+'/home/sign-out';
        }
      //  console.log('error::');
      //  console.log(err);
     //   console.log({ code:err.response.status , text: err.response.statusText,data: err.response.data} );
            const errorService = new ErrorService();
            errorService.handleError(err );
      //  throw err;
    }
);
export default axios;