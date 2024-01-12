import {BasicModel} from "./basic.model";

export class Permission  extends BasicModel{
  public name: string | undefined;
  public active: boolean | undefined|string;
  public description: string | undefined;

  constructor(init?: Partial<Permission>) {
    super();
    Object.assign(this, init);
  }
}
