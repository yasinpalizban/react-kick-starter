import React, {Component, createRef} from 'react';
import './searching.filed.component.scss';
import {Trans, withTranslation} from "react-i18next";
import * as Yup from 'yup';
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash, faAsterisk, faPlus, faSearch, faEllipsisH, faTasks
} from "@fortawesome/free-solid-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Formik, FieldArray, getIn, FormikState} from "formik";
import {Modal} from 'react-bootstrap';
import {createSearchParams} from 'react-router-dom'
import {IReduxDispatch, IReduxState} from "../../interfaces/redux.type.interface";
import withRouter from "../../utils/with.router";
import {convertSign} from "../../utils/convert.sign";
import {OperatorType} from "../../enums/operator.enum";
import AlertComponent from "../alert/alert.component";
import {IPropsSearchingField, IStateSearchingField} from "../../interfaces/isearching.filed";


class SearchingFiledComponent extends Component <IPropsSearchingField, IStateSearchingField> {
    private inputRef: React.RefObject<HTMLInputElement>;
    private sortValue: string = 'id';
    private orderValue: string = 'desc';
    private orderData: Array<{ id: string; text: string }> = [
        {id: 'asc', text: 'Asc',},
        {id: 'desc', text: 'Desc'}
    ];
    redirectPath: string = '';
    listLink: Array<{ link: string, name: string }> = [];
    service: any;
    ruleData!: Array<{ id: string; text: string }>;
    pageData: Array<{ id: string; text: string }> = [
        {id: '10', text: '10'},
        {id: '20', text: '20'},
        {id: '50', text: '50'},
        {id: '100', text: '100'}
    ];
    private sortData: Array<{ id: string; text: string }> = [];
    private operators: string[] = Object.values(OperatorType);
    ruleValue: string = '';
    pageValue: number = 10;

    constructor(props: IPropsSearchingField | Readonly<IPropsSearchingField>) {
        super(props);
        this.inputRef = createRef<HTMLInputElement>();
        this.sortData = props.sortData;
        this.service = props.service;
        this.listLink = props.listLink;
        this.redirectPath = props.redirectPath;
        this.ruleData = props.ruleData

        this.state = {
            modalRef: false,
            initSearchFiled: {
                _data: [{
                    _filed: '',
                    _sign: '',
                    _value: '',
                }
                ],
            }
        }
    }

    componentDidMount() {

    }


    onOpenModal = () => {
        this.setState({modalRef: true});
    }

    onOrderChange = (event: any) => {
        this.orderValue = event.currentTarget.value;
        this.onChangeDataTable();
    }

    onPageChange = (event: any) => {
        this.pageValue = event.currentTarget.value;
        this.onChangeDataTable();
    }

    onSortChange = (event: any) => {
        this.sortValue = event.currentTarget.value;
        this.onChangeDataTable();
    }
    onChangeDataTable = () => {


        const queryParam = (this.inputRef?.current?.value) ? `&${this.sortValue}[lik]=${this.inputRef?.current?.value}` : '';
        const params = createSearchParams();
        params.set('order', this.orderValue);
        params.set('sort', this.sortValue);
        params.set('limit', this.pageValue.toString());
        if (this.ruleValue) {
            params.set('foreignKey', this.ruleValue);
        }
        this.props.navigate(
            {
                pathname: "../list",
                search: `?${params}` + queryParam,
            },
        );

    }
    onRuleChange = (event: any) => {
        this.ruleValue = event.currentTarget.value;
        this.onChangeDataTable();
    }
    onHandleSubmit = async (values: { key: string | any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void) => {
        this.onChangeDataTable();
    }
    onNewItem = () => {
        const path = '../add';
        this.props.navigate(path);
    }
    onSubmitAdvanceSearch = async (values: { _data: string | any[]; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void) => {
        let queryParam: string = '';
        for (let i = 0; i < values._data.length; i++) {
            let sign = convertSign(values._data[i]._sign);
            queryParam += `&${values._data[i]._filed}[${sign}]=${values._data[i]._value}`
        }
        this.setState({modalRef: false});

        const params = createSearchParams();
        params.set('sort', this.sortValue!);
        params.set('order', this.orderValue!);
        params.set('page', '1');

        this.props.navigate(
            {
                pathname: "../list",
                search: `?${params}` + queryParam,
            },
        );


    }
    onModalHide = () => {
        this.setState({modalRef: false});
    }
    onAddField = () => {
        const newState = Object.assign({}, this.state);
        newState.initSearchFiled!._data.push({
            _filed: '',
            _sign: '',
            _value: '',
        });
        this.setState(newState);
    }
    onRemoveField = (event: any) => {
        const index = event.currentTarget.getAttribute('data-value');
        const newState = Object.assign({}, this.state);
        newState.initSearchFiled!._data.splice(index, 1);
        this.setState(newState);
    }
    onChangeData = (event: any) => {
        const value = event.target.value;
        const mode = event.currentTarget.getAttribute('data-mode');
        const index = event.currentTarget.getAttribute('data-index');
        const newState = Object.assign({}, this.state);
        if (mode === 'sign') {
            newState.initSearchFiled!._data[index]._sign = value;

        } else if (mode === 'filed') {
            newState.initSearchFiled!._data[index]._filed = value;

        } else {
            newState.initSearchFiled!._data[index]._value = value;
        }
        this.setState(newState);
    }

    render() {
        return (<>

                <div className="row">

                    <div className="col-md-12 ">
                        <div className="">
                            <Formik
                                initialValues={{
                                    key: '',
                                }}
                                enableReinitialize={true}
                                validationSchema={Yup.object().shape({
                                    key: Yup.string()
                                        .required('required'),

                                })}
                                onSubmit={(fields, {
                                    setSubmitting,
                                    resetForm
                                }) => this.onHandleSubmit(fields, setSubmitting, resetForm)}>
                                {
                                    ({
                                         values,
                                         errors,
                                         touched,
                                         status,
                                         handleChange,
                                         handleBlur,
                                         handleSubmit,
                                         isSubmitting
                                     }) => (
                                        <form onSubmit={handleSubmit} className="form-header"
                                              style={{justifyContent: 'flex-end'}}>
                                            <input ref={this.inputRef} value={values.key} type="text" id="key"
                                                   name="key" required
                                                   className={`au-input au-input--style2 col-md-4 ${(errors.key && touched.key) ? "is-invalid" : ""} `}
                                                   placeholder={` ${this.props.t('common.searchBy')} : ${this.sortValue}`}
                                                   onChange={handleChange} onBlur={handleBlur}/>

                                            <OverlayTrigger
                                                delay={{hide: 300, show: 200}}
                                                overlay={(props) => (
                                                    <Tooltip {...props}>
                                                        {this.props.t('common.search')}
                                                    </Tooltip>
                                                )}
                                                placement="top">
                                                <button
                                                    className="au-btn--submit" type="submit">
                                                    <FontAwesomeIcon icon={faSearch}/>
                                                </button>
                                            </OverlayTrigger>
                                            {this.listLink?.length ? (

                                                <div className="btn-group">
                                                    <button id="button-animated" type="button"
                                                            className="btn btn-warning dropdown-toggle"
                                                            aria-controls="dropdown-animated">
                                                        <FontAwesomeIcon icon={faTasks}/>
                                                    </button>
                                                    <ul id="dropdown-animated" className="dropdown-menu"
                                                        role="menu" aria-labelledby="button-animated">
                                                        {
                                                            this.listLink.map(item => {
                                                                return (
                                                                    <li role="menuitem"><a className="dropdown-item"
                                                                                           href="#"
                                                                                           onClick={(event) => {
                                                                                               this.props.navigate(item.link)
                                                                                           }}>{item.name}</a>
                                                                    </li>
                                                                )
                                                            })
                                                        }

                                                    </ul>
                                                </div>

                                            ) : ''

                                            }


                                            <OverlayTrigger
                                                delay={{hide: 300, show: 200}}
                                                overlay={(props) => (
                                                    <Tooltip {...props}>
                                                        {this.props.t('permissionUser.new')}
                                                    </Tooltip>
                                                )}
                                                placement="top">
                                                <button type="button"
                                                        onClick={this.onNewItem}
                                                        className="au-btn au-btn-icon au-btn&#45;&#45;green au-btn&#45;&#45;small">
                                                    <FontAwesomeIcon icon={faPlus}/>
                                                </button>
                                            </OverlayTrigger>

                                        </form>
                                    )
                                }


                            </Formik>


                        </div>

                    </div>


                </div>
                <div className="row">

                    <div className="col-md-12 ">
                        <div className="form-header">
                            <div className=" "
                                 style={{display: 'inline-flex', marginTop: '15px', marginBottom: '15px'}}>

                                <div className="rs-select2--light ">

                                    <OverlayTrigger
                                        delay={{hide: 300, show: 200}}
                                        overlay={(props) => (
                                            <Tooltip {...props}>
                                                {this.props.t('common.advanceSearch')}
                                            </Tooltip>
                                        )}
                                        placement="top">
                                        <button onClick={this.onOpenModal} className="btn btn-info">
                                            <FontAwesomeIcon icon={faEllipsisH}/>
                                        </button>
                                    </OverlayTrigger>


                                </div>
                                <div className="rs-select2--light rs-select2--md">
                                    <select onClick={this.onSortChange} className="js-select2" name="property">

                                        {this.sortData?.map((key, i) => {
                                            return <option key={i} value={key.id}>{key.text}</option>
                                        })}
                                    </select>
                                    <div className="dropDownSelect2"></div>
                                </div>

                                <div className="rs-select2--light rs-select2--md">
                                    <select onClick={this.onOrderChange} className="js-select2" name="property">

                                        {this.orderData?.map((key, i) => {
                                            return <option key={i} value={key.id}>{key.text}</option>
                                        })}
                                    </select>
                                    <div className="dropDownSelect2"></div>
                                </div>

                                {
                                    this.ruleData?.length ? (<div className="rs-select2--light rs-select2--md">
                                        <select onClick={this.onRuleChange} className="js-select2" name="property">

                                            {this.ruleData?.map((key, i) => {
                                                return <option key={i} value={key.id}>{key.text}</option>
                                            })}
                                        </select>
                                        <div className="dropDownSelect2"></div>
                                    </div>) : ''
                                }


                                <div className="rs-select2--light rs-select2--md">
                                    <select onClick={this.onPageChange} className="js-select2" name="property">

                                        {this.pageData?.map((key, i) => {
                                            return <option key={i} value={key.id}>{key.text}</option>
                                        })}
                                    </select>
                                    <div className="dropDownSelect2"></div>
                                </div>


                            </div>
                        </div>
                    </div>


                </div>


                <Modal show={this.state.modalRef}>
                    <Formik
                        initialValues={this.state.initSearchFiled!}
                        enableReinitialize={true}
                        validationSchema={Yup.object().shape({

                            _data: Yup.array().of(Yup.object().shape({
                                _filed: Yup.string()
                                    .required('required'),
                                _sign: Yup.string()
                                    .required('required'),
                                _value: Yup.string()
                                    .required('required'),
                            }))
                        })}
                        onSubmit={(fields, {
                            setSubmitting,
                            resetForm
                        }) => this.onSubmitAdvanceSearch(fields, setSubmitting, resetForm)}>
                        {

                            ({
                                 values,
                                 errors,
                                 touched,
                                 status,
                                 handleChange,
                                 handleBlur,
                                 handleSubmit,
                                 isSubmitting
                             }) => (
                                <form onSubmit={handleSubmit}>

                                    <div className="modal-header">
                                        <i className="fas fa-search-plus"></i> &nbsp;
                                        <h4 className="modal-title pull-left"><Trans
                                            i18nKey="common.advanceSearch"> </Trans></h4>

                                        <button type="button" className="close pull-right"
                                                onChange={this.onModalHide}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p><Trans i18nKey="common.DoYouWantSearch"></Trans> <strong
                                            className="text-danger"></strong></p>
                                        <div className="modal-footer"
                                             style={{border: 'unset !important', padding: 'unset !important'}}>

                                            <OverlayTrigger
                                                delay={{hide: 300, show: 200}}
                                                overlay={(props) => (
                                                    <Tooltip {...props}>
                                                        {this.props.t('common.addValue')}
                                                    </Tooltip>
                                                )}
                                                placement="top">
                                                <button type="button" onClick={this.onAddField}
                                                        className="btn btn-success pull-right">
                                                    <FontAwesomeIcon icon={faPlus}/>
                                                </button>
                                            </OverlayTrigger>


                                        </div>

                                        <div className="form-group">
                                            <AlertComponent/>
                                        </div>


                                        <FieldArray name="_data">
                                            {({
                                                  push,
                                                  remove
                                              }) => this.state.initSearchFiled!._data.map((p: any, i: number) => {
                                                const sign = `_data[${i}]._sign`;
                                                const touchedSign = getIn(touched, sign);
                                                const errorSign = getIn(errors, sign);

                                                const value = `_data[${i}]._value`;
                                                const touchedValue = getIn(touched, value);
                                                const errorValue = getIn(errors, value);

                                                const filed = `_data[${i}]._filed`;
                                                const touchedFiled = getIn(touched, filed);
                                                const errorFiled = getIn(errors, filed);

                                                return (
                                                    <div className="row">

                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <label className="input-group-addon"> <Trans
                                                                        i18nKey="common.field"></Trans></label>
                                                                    <select
                                                                        id={`_filed` + i}
                                                                        name={filed}
                                                                        data-index={i}
                                                                        data-mode="filed"

                                                                        onChange={this.onChangeData}
                                                                        className={`form-control ${(errorFiled && touchedFiled) ? "is-invalid" : ""} `}

                                                                    >
                                                                        {this.sortData.map((data, i) => {
                                                                            return (<option key={i}
                                                                                            value={data.id}>{data.text}</option>
                                                                            )
                                                                        })}
                                                                    </select>

                                                                    <div className="invalid-feedback ">

                                                                        {

                                                                            errorFiled === 'required' ?
                                                                                <div className="pull-right"><Trans
                                                                                    i18nKey="common.required"></Trans>
                                                                                </div> : ''
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><Trans
                                                                        i18nKey="common.value"></Trans></div>
                                                                    <input type="text"
                                                                           id={`_value` + i}
                                                                           name={value}
                                                                           data-index={i}
                                                                           data-mode="value"
                                                                           required
                                                                           onChange={this.onChangeData}
                                                                           className={`form-control ${(errorValue && touchedValue) ? "is-invalid" : ""} `}
                                                                    />

                                                                    <div className="invalid-feedback ">

                                                                        {
                                                                            errorValue === 'required' ?
                                                                                <div className="pull-right"><Trans
                                                                                    i18nKey="common.required"></Trans>
                                                                                </div> : ''
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><Trans
                                                                        i18nKey="common.sign"></Trans></div>
                                                                    <select

                                                                        id={`_sign` + i}
                                                                        name={sign}
                                                                        className={`form-control ${(errorSign && touchedSign) ? "is-invalid" : ""} `}
                                                                        required
                                                                        data-index={i}
                                                                        data-mode="sign"
                                                                        onChange={this.onChangeData}
                                                                    >
                                                                        {this.operators.map((data, i) => {
                                                                            return (<option value={data}>{data}</option>
                                                                            )
                                                                        })}

                                                                    </select>

                                                                </div>

                                                                <div className="invalid-feedback ">

                                                                    {
                                                                        errorSign === 'required' ?
                                                                            <div className="pull-right"><Trans
                                                                                i18nKey="common.required"></Trans>
                                                                            </div> : ''
                                                                    }

                                                                </div>

                                                            </div>
                                                        </div>


                                                        <div className="col-6">
                                                            <OverlayTrigger
                                                                delay={{hide: 300, show: 200}}
                                                                overlay={(props) => (
                                                                    <Tooltip {...props}>
                                                                        {this.props.t('common.removeValue')}
                                                                    </Tooltip>
                                                                )}
                                                                placement="top">
                                                                <button type="button" style={{width: '100%'}}
                                                                        data-value={i}
                                                                        onClick={this.onRemoveField}
                                                                        className="btn btn-danger btn pull-right">
                                                                    <FontAwesomeIcon icon={faTrash}/>
                                                                </button>
                                                            </OverlayTrigger>

                                                        </div>


                                                    </div>
                                                )
                                            })}

                                        </FieldArray>


                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                onClick={this.onModalHide}><Trans i18nKey="common.cancel"></Trans>
                                        </button>
                                        <button type="submit" className="btn btn-primary"><Trans
                                            i18nKey="common.confirm"></Trans>
                                        </button>
                                    </div>
                                </form>
                            )
                        }


                    </Formik>


                </Modal>

            </>
        )
            ;
    }
}


const mapStateToProps = (state: IReduxState) => {
    return {}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(SearchingFiledComponent)));
