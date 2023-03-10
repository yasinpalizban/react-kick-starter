export class ViewOption {

  public id: number | undefined;
  public name: string | undefined;

  constructor(init?: Partial<ViewOption>) {
    Object.assign(this, init);
  }
}
