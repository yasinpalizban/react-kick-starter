import axios from "axios";
import {environment} from "../../../environments/environment";
const user = JSON.parse(localStorage.getItem('user')!);
const isLoggedViaJwt = user && user.jwt.token;
const isExpire = user && user.jwt.expire > Math.floor(new Date().getTime() / 1000);
const httpClient = axios.create({
      baseURL: environment.baseUrl,
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Accept-Language": localStorage.getItem('lang') ?? 'en'
    }
});
httpClient.interceptors.request.use(
    config => {
        if (isLoggedViaJwt && isExpire) {
            config.headers['Authorization'] = `Bearer ${user.jwt?.token}`;
        }

        // config.headers['Accept'] = 'application/json';
        // config.headers['Content-Type'] = 'application/json';
        //   config.headers['X-Client'] = 'React';
        //config.headers['Accept-Language'] = localStorage.getItem('lang') ?? 'en';
        config.headers['X-CSRF-TOKEN'] = localStorage.getItem('csrf') ?? 'not-set';
        config.withCredentials = true;
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export default httpClient;



