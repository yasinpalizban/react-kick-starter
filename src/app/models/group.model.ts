import {BasicModel} from "./basic.model";

export class Group extends BasicModel {
  public name: string | undefined;
  public description: string | undefined;

  constructor(init?: Partial<Group>) {
    super();
    Object.assign(this, init);
  }
}
