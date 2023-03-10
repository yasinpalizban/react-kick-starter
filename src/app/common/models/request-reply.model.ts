export class RequestReply {

  public id: number | undefined;
  public postId: number | undefined;
  public replyId: number | undefined;
  public message: string | undefined;

  constructor(init?: Partial<RequestReply>) {
    Object.assign(this, init);
  }
}
