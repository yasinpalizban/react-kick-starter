
export interface IAlert {
  type?: string,
  message?:string,
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
  body?: string[];

}
