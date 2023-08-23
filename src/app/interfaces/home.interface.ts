
import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";



export interface IHome {
    settingPost?: {
        twitter: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        },
        instagram: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        },
        googlePlus: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        },
        facebook: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        },
        address: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        },
        phone: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        },
        email: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        }, latitude: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        }, longitude: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        }, linkLocation: {
            id: number,
            key: string,
            value: string,
            description: string,
            status: number,
            createdAt: { date: Date, timezone: string, timezone_type: number },
            updatedAt: { date: Date, timezone: string, timezone_type: number },
            deletedAt: { date: Date, timezone: string, timezone_type: number },
        },
    };


}

export interface IPropsHome extends IPropsCommon {
    _settingList: () => Promise<void>;
    _language: (lang: string) => void;
    _alert:(error:any) => void;
    home: IHome,
}

export interface IStateHome extends IStateCommon {
    applyId?: number,
    title?:string,
    stateId?:number,
    categoryId?:number,
    subCategoryId?:number,

}