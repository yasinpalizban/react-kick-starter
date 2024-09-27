import React, { useEffect} from 'react';
import './list.component.scss';
import {Trans, withTranslation} from "react-i18next";
import { useDispatch, useSelector} from "react-redux";
import {retrieve, remove} from '../../../actions/permission.user.actions';
import withRouter from '../../../hooks/with.router';
import {createSearchParams} from "react-router-dom";
import {newQueryArgument} from "../../../actions/query.argument.actions";
import queryString from "query-string";
import { IReduxState} from "../../../interfaces/redux.type.interface";
import {IPermissionUser} from "../../../interfaces/permission.user.interface";
import ModalComponent from "../../../commons/modal/modal.component";
import AuthCommonComponent from "../../../guards/auth.common.component";
import BasicListHooks from "../../../hooks/basic.list.hooks";
import {PermissionType} from "../../../enums/permission.enum";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IProps} from "../../../interfaces/props.common.interface";
import {SortOrder, TableColumn} from "react-data-table-component/dist/DataTable/types";
import SearchingFiledComponent from "../../../commons/searching-filed/searching.filed.component";
import DataTable from "react-data-table-component";

function ListComponent (props: IProps ){
    const baseListHooks=BasicListHooks();
    const permissionUserList:IResponseObject<IPermissionUser[]> =  useSelector((item:IReduxState)=> item.permissionUser);
    const dispatch= useDispatch();
   const columns: TableColumn<IPermissionUser>[] = [
       {
           name: '#',
           cell: (row, index: number) => index + 1,
           width: "50px"
       },
       {
           name: 'Username',
           selector: (row) => row.username,
           sortable: true,
       },
       {
           name: 'Permission',
           selector: (row) => row.permission,

       },
       {
           name: 'actions',
           selector: (row) => row.actions,

       },
       {
           name: "Actions",
           button: true,
           cell: (item, i) => (
               <div className="table-data-feature">
                   <AuthCommonComponent onClick={onEditItem} index={i} id={item.id} label={props.t('common.edit')}
                                        permissionName={baseListHooks.data.permissionName}
                                        permissionType={PermissionType.Put}>
                   </AuthCommonComponent>

                   <AuthCommonComponent onClick={onOpenModal} index={i} id={item.id} label={props.t('common.remove')}
                                        permissionName={baseListHooks.data.permissionName}
                                        permissionType={PermissionType.Delete}>
                   </AuthCommonComponent>
                   <AuthCommonComponent onClick={onDetailItem} index={i} id={item.id} label={props.t('common.detail')}
                                        permissionName={baseListHooks.data.permissionName}
                                        permissionType={PermissionType.Get}>
                   </AuthCommonComponent>
               </div>
           ),
       }
    ];
    useEffect(()=>{
        (async ()=>{
            await initData();
        })();
    },[])

    const initData=async ()=> {
        if (props.location.search) {
            await retrieve(dispatch,props.location.search);
        } else {
            await retrieve(dispatch);
        }

    }


    const onEditItem = (event:any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../edit/' + id;
        const queryArgument = queryString.parse(props.location.search);
        newQueryArgument(dispatch,queryArgument);
        props.navigate(path);
    }
  const  onDetailItem = (event:any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../detail/' + id;
        props.navigate(path);
    }


   const onOpenModal = (event:any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const index = event.currentTarget.getAttribute('data-index');
       baseListHooks.setData({
            modalRef: true,
            deleteId: id,
            deleteIndex: index,
            deleteItem: permissionUserList.data![index].username
        });

    }
   const onModalConfirm = async () => {
        await remove(dispatch,baseListHooks.data.deleteId!, baseListHooks.data.deleteIndex!);
       baseListHooks.setData({
            modalRef: false,
        });
    }
    const onChangePerPaginate = (limit: number, page: number) => {
        navigation({page: page.toString(), limit: limit.toString()});
        baseListHooks.setPage(limit);
    }
    const onChangePaginate = (page: number) => {
        navigation({page: page.toString(), limit: baseListHooks.data.pageSize.toString()});
    }
    const onSort = (selectedColumn: TableColumn<IPermissionUser>, sortDirection: SortOrder) => {
        navigation({'sort': selectedColumn.name?.toString().toLowerCase()!, 'order': sortDirection});
    }
    const navigation = (params: { page?: string, limit?: string; sort?: string, order?: string }) => {
        const createSearchParam = createSearchParams(params);
        props.navigate(
            {
                pathname: "../list",
                search: `?${createSearchParam}`,
            },
        );
        initData().then();
    }


    return (<>


        <div className="table-responsive table-responsive-data2">
            <SearchingFiledComponent onClickSearch={initData} searchFiled={columns}/>.
            <DataTable
                columns={columns}
                data={permissionUserList?.data!}
                pagination
                paginationServer
                paginationTotalRows={permissionUserList.pager?.total!}
                paginationDefaultPage={permissionUserList.pager?.pageCount!}
                onChangeRowsPerPage={onChangePerPaginate}
                onChangePage={onChangePaginate}
                sortServer
                onSort={onSort}
            />
        </div>
            <ModalComponent show={baseListHooks.data.modalRef}
                            title={baseListHooks.data.deleteItem}
                            onClickConfirm={onModalConfirm}
            />
        </>)
            ;

}





export default withTranslation()(withRouter(ListComponent));



