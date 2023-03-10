export class PermissionGroup {

  public id: number | undefined;
  public permissionId: number | undefined;
  public actions: string | undefined;
  public groupId: number | undefined;

  constructor(init?: Partial<PermissionGroup>) {
    Object.assign(this, init);
  }
}
