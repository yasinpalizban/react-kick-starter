export class RequestPost {

  public id: number | undefined;
  public userId: string | undefined;
  public categoryId: string | undefined;
  public title: string | undefined;
  public body: string | undefined;
  public status: boolean | undefined;

  constructor(init?: Partial<RequestPost>) {
    Object.assign(this, init);
  }
}
