import {BasicModel} from "./basic.model";

export class User extends BasicModel {
  public username: string | undefined;
  public email: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
  public phone: string | undefined;
  public password: string | undefined;
  public groupId: number | undefined|string;
  public active: boolean | undefined|string;
  public status: boolean | undefined|string;

  constructor(init?: Partial<User>) {
    super();
    Object.assign(this, init);
  }
}
