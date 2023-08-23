import axios from "axios";
import {environment} from "../../environments/environment";
import {IAuth} from "../interfaces/authenticate.interface";
const user:IAuth = JSON.parse(localStorage.getItem('user')!);
const isLoggedViaJwt = user && user?.jwt?.token;
const isExpire = user && user?.jwt?.expire! > Math.floor(new Date().getTime() / 1000);
const httpClient = axios.create({
      baseURL: environment.baseUrl,
    headers: {
        "Accept": "application/json",
        "Accept-Language":  'en'
    }
});
httpClient.interceptors.request.use(
    config => {
        if (isLoggedViaJwt && isExpire) {
            config.headers['Authorization'] = `Bearer ${user.jwt?.token}`;
        }


        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        }

        if(localStorage.getItem('lang')){
            config.headers['Accept-Language']=localStorage.getItem('lang');
        }
        config.headers['X-CSRF-TOKEN'] = localStorage.getItem('csrf') ?? 'not-set';
        config.withCredentials = true;
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export default httpClient;



