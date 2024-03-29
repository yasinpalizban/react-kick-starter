import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";
import {Auth} from "./authenticate.model";
import {IGoogleRecaptchaProps} from 'react-google-recaptcha-v3';
export interface IAuth {
  csrf?: string;
  success?: boolean;
  jwt?: {
    token: string,
    expire: number
  };

  role?: {
    name: string,
    id: number
  };
  permissions?: [{
    id: number,
    name: string,
    description: string,
    active: number
  }],
  permissionGroup?: [{
    id: number,
    groupId: number,
    permissionId: number,
    actions: string,
    permission: string
  }];
  permissionUser?: [{
    id: number,
    userId: number,
    permissionId: number,
    actions: string,
    permission: string,
  }];
  userInformation?: {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    image: string,
    email: string,
    phone: string,
  }
}
export interface IPropsAuth extends IPropsCommon {
  _signIn(auth: Auth):  Promise<void>;
  _isSignIn(): Promise<void>;
  _signOut():Promise<void>;
  _activateAccountViaEmail(auth: Auth, props:IPropsCommon): Promise<void>;
  _sendActivateCodeViaEmail(auth: Auth, props:IPropsCommon): Promise<void>;
  _forgot(auth: Auth, props:IPropsCommon): Promise<void>;
  _signUp(auth: Auth, props:IPropsCommon): Promise<void>;
 _resetPasswordViaEmail(auth: Auth, props:IPropsCommon): Promise<void>;
  _resetPasswordViaSms(auth: Auth, props:IPropsCommon): Promise<void>;
  _activateAccountViaSms(auth: Auth, props:IPropsCommon): Promise<void>;
  _sendActivateCodeViaSms(auth: Auth, props:IPropsCommon): Promise<void>;
  googleReCaptchaProps?:IGoogleRecaptchaProps;
  _resetAlert():()=>void;
}

export interface IStateAuth extends  IStateCommon{
}