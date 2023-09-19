import {faEdit, faEnvelopeOpen,  faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './list.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {query, remove} from '../../../actions/user.actions';
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import SearchComponent from "../search/search.component";
import withRouter from '../../../utils/with.router';
import {Modal} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import {createSearchParams} from "react-router-dom";
import {newQueryArgument} from "../../../actions/query.argument.actions";
import queryString from "query-string";
import {RoleType} from "../../../enums/role.enum";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsUser, IStateUser} from "../../../interfaces/user.interface";

class ListComponent extends Component <IPropsUser,IStateUser> {
    sizePage: number;

    constructor(props: IPropsUser | Readonly<IPropsUser>) {
        super(props);
        this.sizePage = 10;
        this.state = {
            modalRef: false,
            deleteId: 0,
            deleteIndex: 0,
            deleteItem: ''
        };
    }

    async componentDidMount() {

        if (this.props.location.search) {
            await this.props._query(this.props.location.search);
        } else {
            await this.props._query(null);
        }


    }

   async componentDidUpdate(prevProps: { location: string; }, prevState: any, snapshot: any) {


        if (this.props.location.search !== '' && prevProps.location.search !== this.props.location.search) {
            if (this.props.location.search) {

         await    this.props._query(this.props.location.search);
            } else {
               await this.props._query(null);
            }
        }

    }


    onEditItem = (event:any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../edit/' + id;
        const queryArgument = queryString.parse(this.props.location.search);
        this.props._newQueryArgument(queryArgument);
        this.props.navigate(path);


    }
    onDetailItem = (event:any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const path = '../detail/' + id;
        this.props.navigate(path);

    }


    onOpenModal = (event:any) => {
        const id = event.currentTarget.getAttribute('data-value');
        const index = event.currentTarget.getAttribute('data-index');
        this.setState({
            modalRef: true,
            deleteId: id,
            deleteIndex: index,
            deleteItem: this.props.userRows.data![index].username
        });

    }
    onModalHide = () => {
        this.setState({modalRef: false});

    }
    onModalConfirm = async () => {
        this.onModalHide();
        await this.props._remove(this.state.deleteId!, this.state.deleteIndex!);
    }
    onChangePaginate = async(event:any) => {
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
        const {userRows} = this.props;

        return (<>


            <div className="table-responsive table-responsive-data2">

                <div>
                    <SearchComponent/>

                </div>
                <table className="table table-data2">
                    <thead>
                    <tr>

                        <th>#</th>
                        <th><Trans i18nKey="filed.userName"></Trans></th>
                        <th><Trans i18nKey="filed.activate"></Trans></th>
                        <th><Trans i18nKey="filed.create"></Trans></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userRows?.data?.map((item, i:number) => {

                            return (
                                <>
                                    <tr key={i+'user1'} className="tr-shadow">

                                        <td>{i + 1}</td>
                                        <td>
                                            <span className="block-email">{item.username} </span>
                                        </td>
                                        <td>
                                            {
                                                item.active  ?
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

                                                <OverlayTrigger
                                                    delay={{hide: 300, show: 200}}
                                                    overlay={(props) => (
                                                        <Tooltip {...props}>
                                                            {this.props.t('common.edit')}
                                                        </Tooltip>
                                                    )}
                                                    placement="top">
                                                    <button data-value={item.id}
                                                            onClick={this.onEditItem} className="item">
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </button>
                                                </OverlayTrigger>

                                                <OverlayTrigger
                                                    delay={{hide: 300, show: 200}}
                                                    overlay={(props) => (
                                                        <Tooltip {...props}>
                                                            {this.props.t('common.remove')}
                                                        </Tooltip>
                                                    )}
                                                    placement="top">
                                                    <button
                                                        onClick={this.onOpenModal} className="item" data-value={item.id}
                                                        data-index={i}>

                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </OverlayTrigger>

                                                <OverlayTrigger
                                                    delay={{hide: 300, show: 200}}
                                                    overlay={(props) => (
                                                        <Tooltip {...props}>
                                                            {this.props.t('common.detail')}
                                                        </Tooltip>
                                                    )}
                                                    placement="top">
                                                    <button data-value={item.id}
                                                            onClick={this.onDetailItem} className="item">
                                                        <FontAwesomeIcon icon={faEnvelopeOpen}/>
                                                    </button>
                                                </OverlayTrigger>


                                            </div>
                                        </td>
                                    </tr>
                                    <tr key={i+'user2'} className="spacer"></tr>
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
                        pageCount={userRows.pager?.pageCount! }
                        previousLabel={this.props.t('common.previous')}
                        activeClassName="page-item active"

                    />
                </div>
            </div>

            <Modal show={this.state.modalRef}>
                <div className="modal-header align-items-center">
                    <FontAwesomeIcon icon={faTrash}/> &nbsp;&nbsp;
                    <h4 className="modal-title pull-left"><Trans i18nKey="common.remove"></Trans></h4>

                    <button type="button" className="close pull-right" aria-label="Close" onClick={this.onModalHide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p><Trans i18nKey="common.doYouWantDelete"></Trans> <strong
                        className="text-danger">{this.state.deleteItem}</strong></p>

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.onModalHide}><Trans
                        i18nKey="common.cancel"></Trans></button>
                    <button type="button" className="btn btn-primary" onClick={this.onModalConfirm}><Trans
                        i18nKey="common.confirm"></Trans></button>
                </div>

            </Modal>

        </>)
            ;
    }
}


const mapStateToProps = (state:IReduxState) => {
    return {userRows: state.user}
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {
        _query: (argument: string | number | object | null) => query(argument, dispatch),
        _remove: (id: number, index: number) => remove(id, index, dispatch),
        _newQueryArgument: (queryArgument: any) => newQueryArgument(queryArgument, dispatch)

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ListComponent)));



