import {BasicModel} from "./basic.model";

export class ToastModel  extends BasicModel{
  message: string | undefined;
  name: string | undefined;
  time: string | undefined;

  constructor(init?: Partial<ToastModel>) {
    super();
    Object.assign(this, init);
  }

}
