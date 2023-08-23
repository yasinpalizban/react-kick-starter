import {AlertService} from './alert.service';
import {initStore} from '../../index';

export class ErrorService {
    private alertService: AlertService;

    constructor() {
        this.alertService = new AlertService();
    }

    handleError(errorResponse:any) {

        this.alertService.alertOption.body.splice(0, this.alertService.alertOption.body.length);
        if (typeof errorResponse?.response?.data?.error === 'string') {
            this.alertService.alertOption.body.push(errorResponse.response.data.error);
        } else {
            for (const key in errorResponse?.response?.data?.error) {
                this.alertService.alertOption.body.push(errorResponse.response.data.error[key]);
            }
        }

        this.alertService.error(` ${errorResponse.response.statusText}
        `, this.alertService.alertOption);


        throw errorResponse;
    }

}

export default ErrorService;
