
export interface IQuery {
  page?: number;
  limit?: number;
  offset?: number;
  sort?: string;
  order?: string;
  range?: string;
  filed?: string;
  q?: object;
  foreignKey?: number;
  selfId?: number;

}
