import React, {Component, useEffect} from 'react';
import './list.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {retrieve, remove} from '../../../actions/user.actions';
import withRouter from '../../../hooks/with.router';
import {createSearchParams} from "react-router-dom";
import {newQueryArgument} from "../../../actions/query.argument.actions";
import queryString from "query-string";
import { IReduxState} from "../../../interfaces/redux.type.interface";
import { IUser} from "../../../interfaces/user.interface";
import ModalComponent from "../../../commons/modal/modal.component";
import * as groupActions from "../../../actions/group.actions";
import AuthCommonComponent from "../../../guards/auth.common.component";
import BasicListHooks from "../../../hooks/basic.list.hooks";
import {PermissionType} from "../../../enums/permission.enum";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IGroup} from "../../../interfaces/group.interface";
import {IProps} from "../../../interfaces/props.common.interface";
import {SortOrder, TableColumn} from "react-data-table-component/dist/DataTable/types";
import SearchingFiledComponent from "../../../commons/searching-filed/searching.filed.component";
import DataTable from "react-data-table-component";

function ListComponent (props: IProps )  {
    const baseListHooks=BasicListHooks();
    const  groupList :IResponseObject<IGroup[]> = useSelector((item:IReduxState)=>item.group);
    const  userList :IResponseObject<IUser[]> = useSelector((item:IReduxState)=>item.user);
    const dispatch=useDispatch();
  const  columns:TableColumn<IUser>[] =  [
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
          name: 'firstName',
          selector: (row) => row.firstName,
          sortable: true,
      },
      {
          name: 'lastName',
          selector: (row) => row.lastName,
          sortable: true,
      },
      {
          name: 'Status',
          selector: (row) => row.status,
          sortable: true,  cell:(item)=>{
              return item.status ?
                  <span className="status--process"><Trans
                      i18nKey="filed.activate"></Trans></span> :
                  <span className="status--denied"><Trans
                      i18nKey="filed.deActivate"></Trans></span>
          }
      },
      {
          name: 'Active',
          selector: (row) => row.active,
          sortable: true,  cell:(item)=>{
              return item.status ?
                  <span className="status--process"><Trans
                      i18nKey="filed.activate"></Trans></span> :
                  <span className="status--denied"><Trans
                      i18nKey="filed.deActivate"></Trans></span>
          }
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
    ;
    let ruleData: Array<{ id: string; text: string }> = [];

       useEffect(()=>{
           (async () => {
               await initData();
               await getGroupList();
           })();
       },[]);

     const  initData=async ()=>{
        if (props.location.search) {
            await retrieve(dispatch,props.location.search);
        } else {
            await retrieve(dispatch);
        }
    }
    const getGroupList=async ()=> {
        await groupActions.retrieve(dispatch,{limit: 10});
        groupList?.data?.map((item) => {
            ruleData.push({
                id: item.id.toString(),
                text: item.name.charAt(0).toUpperCase() + item.name.substring(1)
            });
        });
    }


  const  onEditItem = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../edit/' + id;
        const queryArgument = queryString.parse(props.location.search);
        newQueryArgument(dispatch,queryArgument);
        props.navigate(path);
    }
   const onDetailItem = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../detail/' + id;
        props.navigate(path);
    }


   const onOpenModal = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const index = event.currentTarget.getAttribute('data-index');
        baseListHooks.setData({
            modalRef: true,
            deleteId: id,
            deleteIndex: index,
            deleteItem: userList.data![index].username
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
        navigation({page: page.toString(),limit: baseListHooks.data.pageSize.toString()});
    }
    const onSort = (selectedColumn: TableColumn<IUser>, sortDirection: SortOrder) => {
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
                data={userList?.data!}
                pagination
                paginationServer
                paginationTotalRows={userList.pager?.total!}
                paginationDefaultPage={userList.pager?.pageCount!}
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



