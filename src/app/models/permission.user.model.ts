import {BasicModel} from "./basic.model";

export class PermissionUser extends BasicModel {
  public permissionId: number | undefined;
  public actions: string | undefined;
  public userId: number | undefined;

  constructor(init?: Partial<PermissionUser>) {
    super();
    Object.assign(this, init);
  }
}
