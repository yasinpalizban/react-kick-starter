export class ChatRoom {

  public id: number | undefined;
  public userId: number | undefined;
  public groupId: number| undefined;
  public message: string | undefined;
  public replyId: number | undefined;
  public status: number | undefined;

  constructor(init?: Partial<ChatRoom>) {
    Object.assign(this, init);
  }
}
