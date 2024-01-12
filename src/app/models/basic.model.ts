

export class BasicModel {
  id: string | number| undefined;

  constructor(init?: Partial<BasicModel>) {
    Object.assign(this, init);
  }

}
