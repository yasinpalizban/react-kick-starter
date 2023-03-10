export class NewsSubCategory {

  public id: number | undefined;
  public categoryId: number| undefined;
  public name: string| undefined;
  constructor(init?: Partial<NewsSubCategory>) {
    Object.assign(this, init);
  }
}
