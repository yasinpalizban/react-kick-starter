import {IPagination} from "../../shared/interfaces/pagination.interface";
import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {Group} from "../models/group.model";
import {IStateCommon} from "../../shared/interfaces/state.common.interface";

export interface IGroup {


    pager?: IPagination;
    data?: [{
        id: number,
        name: string,
        description: string,
    }];

}

export interface IPropsGroup extends IPropsCommon {
    _query: (argument: string | number | object | null) => void;
    _save: (group: Group, props: IPropsCommon) => void;
    _update: (group: Group, props: IPropsCommon) => void;
    _remove: (id: number, index: number) => void;
    _newQueryArgument: (queryArgument: any) => void;
    groupDetail: IGroup;
    groupRows: IGroup;
}

export interface IStateGroup extends  IStateCommon{
}