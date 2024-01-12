import React, {Component} from 'react';
import {IPropsCommon} from "../interfaces/props.common.interface";
import {IStateCommon} from "../interfaces/state.common.interface";
import {PermissionType} from "../enums/permission.enum";
import {explodeLink} from "../actions/header.actions";

abstract class BasicListComponent<T, I> extends Component <T & IPropsCommon, I & IStateCommon> {
    protected sizePage: number = 10;
    protected sortData: Array<{ id: string, text: string }> = [];
    protected permissionType = PermissionType
    protected permissionName = '';

    protected constructor(props: any) {
        super(props);
        // @ts-ignore
        this.state = {
            modalRef: false,
            deleteId: 0,
            deleteIndex: 0,
            deleteItem: ''
        };
    }

    componentWillUpdate(nextProps: Readonly<T & IPropsCommon>, nextState: Readonly<I & IStateCommon>, nextContext: any) {
        const explodeLink = window.location.pathname.replace('/admin/', '').replace('dashboard/', '').split('/').filter(item => item != '');
        this.permissionName = explodeLink[0].replaceAll('-', '').toLowerCase();
    }

}


export default BasicListComponent;



