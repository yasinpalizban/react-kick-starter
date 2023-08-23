export class Auth {
  public username: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  public passConfirm: string | undefined;
  public login: string | undefined;
  public remember: boolean | undefined;
  public activeToken: string | undefined;
  public resetToken: string | undefined;
  public token: string | undefined;
  public phone: number | undefined|string;
  public action: string | undefined;
  public socialLogin: string | undefined;

  constructor(init?: Partial<Auth>) {
    Object.assign(this, init);
  }
}
