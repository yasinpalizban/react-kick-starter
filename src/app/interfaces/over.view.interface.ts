
import {IUser} from "./user.interface";


export interface IOverView {
  userPost?: IUser[]
  countPost?:{
    users:number,
    news:number,
    contacts:number,
    visitors:number,
  };

}
