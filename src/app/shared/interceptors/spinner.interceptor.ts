import axios from './header.interceptor';
import {SpinnerService} from "../services/spinner.service";

axios.interceptors.request.use(
    req => {
        const spinnerService = new SpinnerService();
        spinnerService.show();
        return req;
    }
);

axios.interceptors.response.use(
    res => {
        const spinnerService = new SpinnerService();
        spinnerService.hide();
        return res;
    },
);
export default axios;