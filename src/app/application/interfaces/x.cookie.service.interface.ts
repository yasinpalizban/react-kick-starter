import {Contact} from "../../common/models/contact.model";

export interface XCookieServiceInterface {

  deleteAllCookie(): void

  deleteToCookie(id: number): void;

  getCookie(): number[];

  isCooke(): boolean;
  addToCookie(id: number): void;

}
