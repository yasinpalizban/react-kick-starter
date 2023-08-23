export class Graph {


  public type: string  | undefined;
  public fromDate: string | undefined;
  public toDate: string | undefined;


  constructor(init?: Partial<Graph>) {
    Object.assign(this, init);
  }
}
