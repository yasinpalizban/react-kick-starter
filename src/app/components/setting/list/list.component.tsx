import React, {Component, useEffect, useState} from 'react';
import './list.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {retrieve, remove} from '../../../actions/setting.actions';
import moment from "moment";
import withRouter from '../../../utils/with.router';
import ReactPaginate from 'react-paginate';
import {createSearchParams} from "react-router-dom";
import {newQueryArgument} from "../../../actions/query.argument.actions";
import queryString from "query-string";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import SearchingFiledComponent from "../../../commons/search-field/searching.filed.component";
import ModalComponent from "../../../commons/modal/modal.component";
import AuthCommonComponent from "../../../guards/auth.common.component";
import {PermissionType} from "../../../enums/permission.enum";
import BasicListHooks from "../../../hooks/basic.list.hooks";
import {IPropsSetting} from "../../../interfaces/setting.interface";



function ListComponent (props:IPropsSetting) {
    const baseListHooks=BasicListHooks();
    useEffect(()=>{
        (async ()=>{
            await initData();
        })();

    },[]);

    const initData=async ()=> {
        if (props.location.search) {
            await props._retrieve(props.location.search);
        } else {
            await props._retrieve(null);
        }
    }

   const onEditItem = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../edit/' + id;
        const queryArgument = queryString.parse(props.location.search);
        props._newQueryArgument(queryArgument);
        props.navigate(path);
    }
  const  onDetailItem = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../detail/' + id;
        props.navigate(path);
    }


 const   onOpenModal = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const index = event.currentTarget.getAttribute('data-index');
        baseListHooks.setData({
            modalRef: true,
            deleteId: id,
            deleteIndex: index,
            deleteItem: props.settingList.data![index].key
        });
    }

 const   onModalConfirm = async () => {
        await props._remove(baseListHooks.data.deleteId, baseListHooks.data.deleteIndex);
     baseListHooks.setData({
            modalRef: false,
        });
    }

  const  onChangePaginate = async (event: any) => {
        const params = {
            page: event.selected + 1,
        };
        const createSearchParam = createSearchParams(params);
        props.navigate(
            {
                pathname: "../list",
                search: `?${createSearchParam}`,
            },
        );
    }
    const  sortData = [
        {id: 'id', text: 'Id',},
        {id: 'groupId', text: 'Group',},
        {id: 'permissionId', text: 'Permission',}
    ];
    const {settingList} = props;
    return (<>
        <div className="table-responsive table-responsive-data2">
            <SearchingFiledComponent onClickSearch={initData} sortData={sortData}/>

            <table className="table table-data2">
                <thead>
                <tr>

                    <th>#</th>
                    <th><Trans i18nKey="filed.key"></Trans></th>
                    <th><Trans i18nKey="filed.value"></Trans></th>
                    <th><Trans i18nKey="filed.status"></Trans></th>
                    <th><Trans i18nKey="filed.create"></Trans></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    settingList?.data?.map((item:any, i: number) => {

                        return (
                            <>
                                <tr key={i + 'setting1'} className="tr-shadow">

                                    <td>{i + 1}</td>
                                    <td>
                                        <span className="block-email">{item.key} </span>
                                    </td>
                                    <td className="desc">{item.value.substr(0, 20)}</td>
                                    <td>
                                        {
                                            item.status ?
                                                <span className="status--process"><Trans
                                                    i18nKey="filed.activate"></Trans></span> :
                                                <span className="status--denied"><Trans
                                                    i18nKey="filed.deActivate"></Trans></span>
                                        }


                                    </td>

                                    <td>
                                        <span>{moment(item.createdAt).format('YYYY-MM-DD')}</span>
                                    </td>
                                    <td>
                                        <div className="table-data-feature">
                                            <AuthCommonComponent onClick={onEditItem} index={i} id={item.id} label={props.t('common.edit')} permissionName={baseListHooks.data.permissionName}
                                                                 permissionType={PermissionType.Put} >
                                            </AuthCommonComponent>

                                            <AuthCommonComponent onClick={onOpenModal} index={i} id={item.id} label={props.t('common.remove')} permissionName={baseListHooks.data.permissionName}
                                                                 permissionType={PermissionType.Delete}>
                                            </AuthCommonComponent>
                                            <AuthCommonComponent onClick={onDetailItem} index={i} id={item.id} label={props.t('common.detail')} permissionName={baseListHooks.data.permissionName}
                                                                 permissionType={PermissionType.Get}>
                                            </AuthCommonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr key={i + 'setting2'} className="spacer"></tr>
                            </>


                        )
                            ;
                    })

                }
                </tbody>
            </table>
        </div>
        <div className="row mt-3">
            <div className="col-12 col-md-12 col-xs-12">

                <ReactPaginate
                    containerClassName="pagination  justify-content-center"
                    pageLinkClassName="page-link"
                    previousClassName="page-link"
                    nextClassName="page-link"
                    nextLabel={props.t('common.next')}
                    onPageChange={onChangePaginate}
                    pageRangeDisplayed={baseListHooks.data.pageSize}
                    pageCount={settingList.pager?.pageCount!}
                    previousLabel={props.t('common.previous')}
                    activeClassName="page-item active"

                />
            </div>
        </div>

        <ModalComponent show={baseListHooks.data.modalRef}
                        title={baseListHooks.data.deleteItem}
                        onClickConfirm={onModalConfirm}
        />

    </>)
        ;



}


const mapStateToProps = (state: IReduxState) => {
    return {settingList: state.setting}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _retrieve: (argument: string | number | object | null) => retrieve(argument, dispatch),
        _remove: (id: number, index: number) => remove(id, index, dispatch),
        _newQueryArgument: (queryArgument: any) => newQueryArgument(queryArgument, dispatch)

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ListComponent)));



