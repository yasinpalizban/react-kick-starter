import React, { useEffect} from 'react';
import './list.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {retrieve, remove} from '../../../actions/setting.actions';
import withRouter from '../../../hooks/with.router';
import {createSearchParams} from "react-router-dom";
import queryString from "query-string";
import ModalComponent from "../../../commons/modal/modal.component";
import AuthCommonComponent from "../../../guards/auth.common.component";
import {PermissionType} from "../../../enums/permission.enum";
import BasicListHooks from "../../../hooks/basic.list.hooks";
import {IProps} from "../../../interfaces/props.common.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {ISetting} from "../../../interfaces/setting.interface";
import {useDispatch, useSelector} from "react-redux";
import {IReduxState} from "../../../interfaces/redux.type.interface";
import {newQueryArgument} from "../../../actions/query.argument.actions";
import {SortOrder, TableColumn} from "react-data-table-component/dist/DataTable/types";
import SearchingFiledComponent from "../../../commons/searching-filed/searching.filed.component";
import DataTable from "react-data-table-component";


function ListComponent (props:IProps) {
    const baseListHooks=BasicListHooks();
    const settingList:IResponseObject<ISetting[]>= useSelector((item:IReduxState)=> item.setting);
    const dispatch=useDispatch();
    const columns:TableColumn<ISetting>[] = [
        {
            name: '#',
            cell: (row, index: number) => index + 1,
            width: "50px"
        },
        {
            name: 'Key',
            selector: (row) => row.key,
            sortable: true,
        },
        {
            name: 'Value',
            selector: (row) => row.value,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true,
            cell:(item)=>{
                return item.status ?
                    <span className="status--process"><Trans
                        i18nKey="filed.activate"></Trans></span> :
                    <span className="status--denied"><Trans
                        i18nKey="filed.deActivate"></Trans></span>
            }
        },
        {
            name: 'Description',
            selector: (row) => row.description,

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
    },[]);

    const initData=async ()=> {
        if (props.location.search) {
            await retrieve(dispatch,props.location.search);
        } else {
            await retrieve(dispatch);
        }
    }

   const onEditItem = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../edit/' + id;
        const queryArgument = queryString.parse(props.location.search);
        newQueryArgument(dispatch,queryArgument);
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
            deleteItem: settingList.data![index].key
        });
    }

 const   onModalConfirm = async () => {
        await remove(dispatch,baseListHooks.data.deleteId, baseListHooks.data.deleteIndex);
     baseListHooks.setData({
            modalRef: false,
        });
    }

    const onChangePerPaginate = (limit: number, page: number) => {
        navigation({page: page.toString(), limit: limit.toString()});
        baseListHooks.setPage(limit);
    }
    const onChangePaginate = (page: number) => {
        navigation({page: page.toString(),limit: baseListHooks.data.pageSize.toString()});
    }
    const onSort = (selectedColumn: TableColumn<ISetting>, sortDirection: SortOrder) => {
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
                data={settingList?.data!}
                pagination
                paginationServer
                paginationTotalRows={settingList.pager?.total!}
                paginationDefaultPage={settingList.pager?.pageCount!}
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



