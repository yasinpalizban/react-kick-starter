export class RequestCategory {

  public id: number | undefined;
  public name: string | undefined;
  public language: string | undefined;
  constructor(init?: Partial<RequestCategory>) {
    Object.assign(this, init);
  }
}
