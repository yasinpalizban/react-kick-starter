import {AlertType} from '../enums/alert.enum';
import {BasicModel} from "./basic.model";


export class Alert extends BasicModel {
  type: AlertType | undefined;
  message: string | undefined;
  autoClose: boolean | undefined;
  keepAfterRouteChange: boolean | undefined;
  fade: boolean | undefined;
  body:string[]=[];

  constructor(init?: Partial<Alert>) {
    super();
    Object.assign(this, init);
  }

}
