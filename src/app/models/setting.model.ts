export class Setting {

  public id: number | undefined;
  public key: string | undefined;
  public value: string | undefined;
  public description: string | undefined;
  public status: boolean | undefined
  constructor(init?: Partial<Setting>) {
    Object.assign(this, init);
  }
}
