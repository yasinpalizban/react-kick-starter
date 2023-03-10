export class ChatPrivate {

  public id: number | undefined;
  public userSenderId: number | undefined;
  public userReceiverId: number | undefined;
  public message: string | undefined;
  public replyId: number | undefined;
  public status: number | undefined;

  constructor(init?: Partial<ChatPrivate>) {
    Object.assign(this, init);
  }
}
