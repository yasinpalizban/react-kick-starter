export class NewsComment {

  public id: number | undefined;
  public postId: number | undefined;
  public replyId: number | undefined;
  public message: string | undefined;

  constructor(init?: Partial<NewsComment>) {
    Object.assign(this, init);
  }
}
