export class Visitor {

  public id: number | undefined;
  public ip: string | undefined;
  public country: string | undefined;
  public city: string | undefined;
  public lat: string | undefined;
  public lang: string | undefined;
  public os: string | undefined;

  constructor(init?: Partial<Visitor>) {
    Object.assign(this, init);
  }
}
