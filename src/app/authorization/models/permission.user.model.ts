export class PermissionUser {

  public id: number | undefined;
  public permissionId: number | undefined;
  public actions: string | undefined;
  public userId: number | undefined;

  constructor(init?: Partial<PermissionUser>) {
    Object.assign(this, init);
  }
}
