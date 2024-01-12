import {BasicModel} from "./basic.model";

export class PermissionGroup extends BasicModel {
  public permissionId: number | undefined;
  public actions: string | undefined;
  public groupId: number | undefined;

  constructor(init?: Partial<PermissionGroup>) {
    super();
    Object.assign(this, init);
  }
}
