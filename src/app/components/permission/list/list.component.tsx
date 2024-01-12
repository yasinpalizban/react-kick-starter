import {faEdit, faEnvelopeOpen, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './list.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {retrieve, remove} from '../../../actions/permission.actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import withRouter from '../../../utils/with.router';
import ReactPaginate from 'react-paginate';
import {createSearchParams} from "react-router-dom";
import {newQueryArgument} from "../../../actions/query.argument.actions";
import queryString from "query-string";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsPermission, IStatePermission} from "../../../interfaces/permission.interface";
import ModalComponent from "../../../commons/modal/modal.component";
import SearchingFiledComponent from "../../../commons/search-field/searching.filed.component";
import BasicListComponent from "../../../abstracts/basic.list";
import AuthCommonComponent from "../../../guards/auth.common.component";

class ListComponent extends BasicListComponent <IPropsPermission, IStatePermission> {

    sortData = [
        {id: 'id', text: 'Id',},
        {id: 'name', text: 'Name',},
        {id: 'active', text: 'Active',}
    ];

    constructor(props: IPropsPermission | Readonly<IPropsPermission>) {
        super(props);
    }

    async componentDidMount() {

        if (this.props.location.search) {
            await this.props._retrieve(this.props.location.search);
        } else {
            await this.props._retrieve(null);
        }
    }

    async componentDidUpdate(prevProps: { location: string; }, prevState: any, snapshot: any) {

        if (this.props.location.search !== '' && prevProps.location.search !== this.props.location.search) {
            if (this.props.location.search) {
                await this.props._retrieve(this.props.location.search);
            } else {
                await this.props._retrieve(null);
            }
        }
    }


    onEditItem = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../edit/' + id;
        const queryArgument = queryString.parse(this.props.location.search);
        this.props._newQueryArgument(queryArgument);
        this.props.navigate(path);
    }
    onDetailItem = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../detail/' + id;
        this.props.navigate(path);
    }


    onOpenModal = (event: any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const index = event.currentTarget.getAttribute('data-index');
        this.setState({
            modalRef: true,
            deleteId: id,
            deleteIndex: index,
            deleteItem: this.props.permissionList.data![index].name
        });

    }
    onModalConfirm = async () => {
        await this.props._remove(this.state.deleteId!, this.state.deleteIndex!);
        this.setState({
            modalRef: false,
        });

    }
    onChangePaginate = (event: any) => {
        const params = {
            page: event.selected + 1,
        };

        const createSearchParam = createSearchParams(params);
        this.props.navigate(
            {
                pathname: "../list",
                search: `?${createSearchParam}`,
            },
        );
    }

    render() {
        const {permissionList} = this.props;

        return (<>


            <div className="table-responsive table-responsive-data2">

                <SearchingFiledComponent sortData={this.sortData}/>

                <table className="table table-data2">
                    <thead>
                    <tr>

                        <th>#</th>
                        <th><Trans i18nKey="filed.name"></Trans></th>
                        <th><Trans i18nKey="filed.activate"></Trans></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        permissionList?.data?.map((item, i: number) => {

                            return (
                                <>
                                    <tr key={i + 'permission1'} className="tr-shadow">

                                        <td>{i + 1}</td>
                                        <td>
                                            <span className="block-email">{item.name} </span>
                                        </td>
                                        <td>
                                            {
                                                item.active ?
                                                    <span className="status--process"><Trans
                                                        i18nKey="filed.activate"></Trans></span> :
                                                    <span className="status--denied"><Trans
                                                        i18nKey="filed.deActivate"></Trans></span>
                                            }


                                        </td>

                                        <td>
                                            <div className="table-data-feature">

                                                <AuthCommonComponent onClick={this.onEditItem} index={i} id={item.id} label={this.props.t('common.edit')} permissionName={this.permissionName}
                                                                     permissionType={this.permissionType.Put}>
                                                </AuthCommonComponent>

                                                <AuthCommonComponent onClick={this.onOpenModal} index={i} id={item.id} label={this.props.t('common.remove')} permissionName={this.permissionName}
                                                                     permissionType={this.permissionType.Delete}>
                                                </AuthCommonComponent>
                                                <AuthCommonComponent onClick={this.onDetailItem} index={i} id={item.id} label={this.props.t('common.detail')} permissionName={this.permissionName}
                                                                     permissionType={this.permissionType.Get}>
                                                </AuthCommonComponent>


                                            </div>
                                        </td>
                                    </tr>
                                    <tr key={i + 'permission2'} className="spacer"></tr>
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
                        nextLabel={this.props.t('common.next')}
                        onPageChange={this.onChangePaginate}
                        pageRangeDisplayed={this.sizePage}
                        pageCount={permissionList.pager?.pageCount!}
                        previousLabel={this.props.t('common.previous')}
                        activeClassName="page-item active"

                    />
                </div>
            </div>

            <ModalComponent show={this.state.modalRef}
                            title={this.state.deleteItem}
                            onClickConfirm={this.onModalConfirm}
            />

        </>)
            ;
    }
}


const mapStateToProps = (state: IReduxState) => {
    return {permissionList: state.permission}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _retrieve: (argument: string | number | object | null) => retrieve(argument, dispatch),
        _remove: (id: number, index: number) => remove(id, index, dispatch),
        _newQueryArgument: (queryArgument: any) => newQueryArgument(queryArgument, dispatch)

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ListComponent)));



