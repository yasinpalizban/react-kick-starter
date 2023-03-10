export class NewsCategory {

  public id: number | undefined;
  public name: string | undefined;
  public language: string | undefined;
  constructor(init?: Partial<NewsCategory>) {
    Object.assign(this, init);
  }
}
