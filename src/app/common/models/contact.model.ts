export class Contact {

  public id: number | undefined;
  public title: string | undefined;
  public name: string | undefined;
  public email: string | undefined;
  public message: string | undefined;
  public reply: string | undefined;
  public phone: number | undefined;
  public status: boolean | undefined;
  constructor(init?: Partial<Contact>) {
    Object.assign(this, init);
  }
}
