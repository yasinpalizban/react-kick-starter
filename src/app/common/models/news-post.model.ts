export class NewsPost {

  public id: number | undefined;
  public userId: string | undefined;
  public categoryId: string | undefined;
  public subCategoryId: string | undefined;
  public title: string | undefined;
  public picture: string | undefined;
  public body: string | undefined;
  public status: boolean | undefined;

  constructor(init?: Partial<NewsPost>) {
    Object.assign(this, init);
  }
}
