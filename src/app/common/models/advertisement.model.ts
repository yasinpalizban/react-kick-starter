export class Advertisement {

  public id: number | undefined;
  public name: string | undefined;
  public link: string | undefined;
  public 	description: string | undefined;
  public status: boolean | undefined;
  constructor(init?: Partial<Advertisement>) {
    Object.assign(this, init);
  }
}
