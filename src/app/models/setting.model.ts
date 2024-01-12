import {BasicModel} from "./basic.model";

export class Setting extends BasicModel {
  public key: string | undefined;
  public value: string | undefined;
  public description: string | undefined;
  public status: boolean | undefined
  constructor(init?: Partial<Setting>) {
    super();
    Object.assign(this, init);
  }
}
