import React, {Component, createRef} from 'react';
import './search.component.scss';
import {Trans, withTranslation} from "react-i18next";
import * as Yup from 'yup';
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash, faAsterisk, faPlus, faSearch, faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import withRouter from "../../../utils/with.router";
import {Formik, FieldArray, getIn, FormikState} from "formik";
import {OperatorType} from "../../../enums/operator.enum";
import {FunctionSearchType} from "../../../enums/function.search.enum";
import {Modal} from 'react-bootstrap';
import AlertComponent from "../../alert/alert.component";
import {createSearchParams} from 'react-router-dom'
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsSetting, IStateSetting} from "../../../interfaces/setting.interface";

class SearchComponent extends Component <IPropsSetting, IStateSetting> {
    private inputRef: React.RefObject<HTMLInputElement>;
    private sortValue: string | undefined;
    private orderValue: string | undefined;
    private orderData: Array<{ id: string; text: string }>;
    private sortData: Array<{ id: string; text: string }>;

    private operators: string[];
    private functions: [string, string][];

    constructor(props: IPropsSetting | Readonly<IPropsSetting>) {
        super(props);
        this.inputRef = createRef<HTMLInputElement>();

        this.state = {
            modalRef: false,
            initSearchFiled: {
                _function: '',
                _data: [{
                    _filed: '',
                    _sign: '',
                    _value: '',
                }
                ],
            }
        }
        this.sortValue = 'id';
        this.orderValue = 'desc';
        this.orderData = [{
            id: 'asc',
            text: 'Asc',

        },
            {
                id: 'desc',
                text: 'Desc'
            }];
        this.sortData = [
            {
                id: 'id',
                text: 'Id',

            },
            {
                id: 'key',
                text: 'Key ',

            },
            {
                id: 'value',
                text: 'Value',

            },
            {
                id: 'status',
                text: 'Status',

            }

        ];


        this.operators = Object.values(OperatorType);

        this.functions = Object.entries(FunctionSearchType);


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

    onSortChange = (event: any) => {
        this.sortValue = event.currentTarget.value;
        this.onChangeDataTable();
    }
    onChangeDataTable = () => {

        const search = {
            fun: FunctionSearchType.Like,
            sgn: '',
            val: this.inputRef?.current?.value
        };
        //
        const queryParam = new URLSearchParams();

        if (this.sortValue != null) {
            queryParam.append(this.sortValue, JSON.stringify(search));
        }


        const searchParams: any = {
            sort: this.sortValue,
            order: this.orderValue,
            q: queryParam,
        }
        const params = createSearchParams(searchParams);
        this.props.navigate(
            {
                pathname: "../list",
                search: `?${params}`,
            },
        );

    }

    onHandleSubmit = async (values: { key: string|any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void) => {
        this.onChangeDataTable();
    }
    onNewItem = () => {

        const path = '../add';
        this.props.navigate(path);

    }
    onSubmitAdvanceSearch = async (values: { _data: string | any[]; _function: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void) => {


        const queryParam = new URLSearchParams();

        for (let i = 0; i < values._data.length; i++) {
            const search = {
                fun: values._function,
                sgn: values._data[i]._sign,
                val: values._data[i]._value,
            };
           queryParam.append(values._data[i]._filed, JSON.stringify(search));
        }
        this.setState({modalRef: false});


        const searchParams:any={
            page: 1,
            sort: this.sortValue,
            order: this.orderValue,
            q: queryParam
        }
        const params = createSearchParams(searchParams);

        this.props.navigate(
            {
                pathname: "../list",
                search: `?${params}`,
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
    onRemoveField = (event:any) => {
        const index = event.currentTarget.getAttribute('data-value');
        const newState = Object.assign({}, this.state);
        newState.initSearchFiled!._data.splice(index, 1);
        this.setState(newState);
    }
    onChangeData = (event:any) => {
        const value = event.target.value;
        const mode = event.currentTarget.getAttribute('data-mode');
        const index = event.currentTarget.getAttribute('data-index');
        const newState = Object.assign({}, this.state);
        if (mode === 'function') {
            newState.initSearchFiled!._function = value;
        } else if (mode === 'sign') {
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
                                            {/*<OverlayTrigger*/}
                                            {/*    delay={{hide: 300, show: 200}}*/}
                                            {/*    overlay={(props) => (*/}
                                            {/*        <Tooltip {...props}>*/}
                                            {/*            {this.props.t('setting.new')}*/}
                                            {/*        </Tooltip>*/}
                                            {/*    )}*/}
                                            {/*    placement="top">*/}
                                            {/*    <button type="button"*/}
                                            {/*            onClick={this.onNewItem}*/}
                                            {/*            className="au-btn au-btn-icon au-btn&#45;&#45;green au-btn&#45;&#45;small">*/}
                                            {/*        <FontAwesomeIcon icon={faPlus}/>*/}
                                            {/*    </button>*/}
                                            {/*</OverlayTrigger>*/}

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

                                        {this.sortData.map((key, i) => {
                                            return <option key={i} value={key.id}>{key.text}</option>
                                        })}
                                    </select>
                                    <div className="dropDownSelect2"></div>
                                </div>

                                <div className="rs-select2--light rs-select2--md">
                                    <select onClick={this.onOrderChange} className="js-select2" name="property">

                                        {this.orderData.map((key, i) => {
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
                            _function: Yup.string()
                                .required('required'),
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

                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"><Trans
                                                    i18nKey="common.function"></Trans></div>
                                                <select
                                                    id="_function"
                                                    name="_function"
                                                    data-mode="function"
                                                    onChange={this.onChangeData}
                                                    className={`form-control ${(touched._function && errors._function) ? "is-invalid" : ""} `}>

                                                    {
                                                        this.functions.map((funs, i) => {
                                                            return (<option key={i} value={funs[0]}>{funs[1]}</option>)
                                                        })
                                                    }


                                                </select>
                                                <div className="input-group-addon">
                                                    <FontAwesomeIcon icon={faAsterisk}/>
                                                </div>
                                                <div className="invalid-feedback ">

                                                    {
                                                        errors._function === 'required' ?
                                                            <div className="pull-right"><Trans
                                                                i18nKey="common.required"></Trans>
                                                            </div> : ''
                                                    }
                                                </div>

                                            </div>
                                        </div>


                                        <FieldArray name="_data">
                                            {({push, remove}) => this.state.initSearchFiled!._data.map((p:any, i:number) => {
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


const mapStateToProps = (state:IReduxState) => {
    return {}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(SearchComponent)));
