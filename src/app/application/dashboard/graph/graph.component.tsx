import React, {Component} from 'react';
import './graph.component.scss';
import {connect} from "react-redux";
import {Trans, withTranslation} from "react-i18next";
import withRouter from "../../../shared/utils/with.router";
import {query, save} from '../../actions/graph.actions';
import {faAsterisk, faCalendar, faChartArea, faList} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Formik, FormikState} from "formik";
import * as Yup from "yup";
import AlertComponent from "../../../shared/components/alert/alert.component";
import {getDateByName} from "../../utils/get.date.by.name";

import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from 'chart.js';
import {Pie, Bar} from 'react-chartjs-2';

import {newAlert} from "../../../shared/actions/alert.actions";
import {alertError} from "../../../shared/utils/alert.functions";
import {IReduxDispatch, IReduxState} from "../../../shared/interfaces/redux.type.interface";
import {Graph} from "../../models/graph.model";
import {IPropsGraph, IStateGraph} from "../../interfaces/graph.interface";


class GraphComponent extends Component<IPropsGraph, IStateGraph> {
    private data2:any;
    private data:any;
    private options:any;
    constructor(props: IPropsGraph | Readonly<IPropsGraph>) {
        super(props);
        ChartJS.register(
            ArcElement,
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend
        );

        this.data = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };


        this.options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'center',
                },
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart',
                },
            },
        };

        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

        this.data2 = {
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [100, 33, 44, 6, 66],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Dataset 2',
                    data: [66, 7, 17, 88, 33],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };


    }

    async componentDidMount() {
        await this.props._query(null);


    }

    handleSubmit = async (values: { _type?: string; toDate: any; fromDate: any; date: any; value?: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ _type: string; toDate: string; fromDate: string; date: string; }>> | undefined) => void) => {

        if ((!values?.date || values?.date === 'none') &&
            !values?.fromDate &&
            !values?.toDate) {
            const error = alertError(this.props.t('error.selectDate'));
            this.props._error(error);
            return;
        }


        const fromDate = values.value.fromDate.length > 0 ? values.value.fromDate : getDateByName(values.value.date);
        const toDate = values.value.toDate.length > 0 ? values.value.toDate : getDateByName('today');


        await this.props._save({
            type: values.value._type,
            toDate: toDate.replace("\//", "-"),
            fromDate: fromDate.replace("\//", "-")
        });

    }

    render() {


        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header" style={{direction: 'ltr'}}>
                                <FontAwesomeIcon icon={faList}/>
                                <strong className="card-title pl-2"><Trans i18nKey="dashboard.chartData"></Trans>
                                </strong>
                            </div>
                            <div className="card-body">

                                <Formik
                                    initialValues={{
                                        _type: '',
                                        toDate: '',
                                        fromDate: '',
                                        date: '',
                                    }}
                                    enableReinitialize={true}
                                    validationSchema={Yup.object().shape({
                                        _type: Yup.string()
                                            .required('required'),
                                    })}
                                    onSubmit={(fields, {
                                        setSubmitting,
                                        resetForm
                                    }) => this.handleSubmit(fields, setSubmitting, resetForm)}>
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

                                                <div className="form-group">
                                                    <AlertComponent/>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-addon"><Trans
                                                            i18nKey="dashboard.type"></Trans></div>
                                                        <select defaultValue={'default'} id="_type" name="_type" required
                                                                className={`form-control ${(errors._type && touched._type) ? "is-invalid" : ""} `}
                                                                onChange={handleChange} onBlur={handleBlur}>
                                                            <option disabled
                                                                    value="default"> {this.props.t('common.selectInputMessage')} </option>
                                                            <option
                                                                value="news">  {this.props.t("dashboard.news")} </option>
                                                            <option
                                                                value="visitor"> {this.props.t("dashboard.visitor")} </option>
                                                            <option
                                                                value="request">  {this.props.t("dashboard.request")}</option>
                                                        </select>
                                                        <div className="input-group-addon">
                                                            <FontAwesomeIcon icon={faAsterisk}/>
                                                        </div>

                                                        <div className="invalid-feedback ">

                                                            {
                                                                errors._type === 'required' ?
                                                                    <div className="pull-right"><Trans
                                                                        i18nKey="common.required"></Trans>
                                                                    </div> : ''
                                                            }

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">


                                                        <div className="input-group-addon"><Trans
                                                            i18nKey="dashboard.date"></Trans></div>

                                                        <div className="form-control form-check-inline form-check"
                                                             style={{border: 'none'}}>
                                                            <label
                                                                   className="switch col-form-label-sm switch-text switch-primary switch-pill m-r-10 m-l-20">
                                                                <Trans i18nKey="common.none"></Trans>
                                                            </label>
                                                            <input
                                                                name="date"
                                                                type="radio"
                                                                id="inline-checkbox0"
                                                                value="none"
                                                                onChange={handleChange}
                                                                className="form-check-input witch-input"/>
                                                            <label
                                                                   className="switch col-form-label-sm switch-text switch-primary switch-pill m-r-10 m-l-20">
                                                                <Trans i18nKey="dashboard.today"> </Trans>
                                                            </label>
                                                            <input
                                                                name="date"
                                                                type="radio"
                                                                id="inline-checkbox1"
                                                                value="today"
                                                                onChange={handleChange}
                                                                className="form-check-input witch-input"/>
                                                            <label
                                                                   className="switch col-form-label-sm  switch-text  m-r-10 m-l-20">

                                                                <Trans i18nKey="dashboard.lastWeek"> </Trans>
                                                            </label>
                                                            <input
                                                                name="date"
                                                                type="radio"
                                                                id="inline-checkbox2"
                                                                value="lastWeek"
                                                                onChange={handleChange}
                                                                className="form-check-input witch-input"/>
                                                            <label
                                                                   className="switch col-form-label-sm switch-text switch-primary switch-pill m-r-10 m-l-20">
                                                                <Trans i18nKey="dashboard.lastMonth"> </Trans>
                                                            </label>
                                                            <input
                                                                name="date"
                                                                type="radio"
                                                                id="inline-checkbox3"
                                                                value="lastMonth"
                                                                onChange={handleChange}
                                                                className="form-check-input witch-input"/>
                                                        </div>
                                                        <div className="input-group-addon">
                                                            <FontAwesomeIcon icon={faCalendar}/>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-addon"><Trans
                                                            i18nKey="dashboard.fromDate"></Trans></div>
                                                        <input type="date"
                                                               id="fromDate"
                                                               name="fromDate"
                                                               onChange={handleChange}
                                                               className={`form-control ${(errors.fromDate && touched.fromDate) ? "is-invalid" : ""} `}
                                                        />
                                                        <div className="input-group-addon">
                                                            <FontAwesomeIcon icon={faCalendar}/>
                                                        </div>

                                                        <div className="invalid-feedback ">

                                                            {
                                                                errors.fromDate === 'required' ?
                                                                    <div className="pull-right"><Trans
                                                                        i18nKey="common.required"></Trans>
                                                                    </div> : ''
                                                            }

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-addon"><Trans
                                                            i18nKey="dashboard.toDate"></Trans></div>
                                                        <input type="date"
                                                               id="toDate"
                                                               name="toDate"
                                                               onChange={handleChange}
                                                               className={`form-control ${(errors.toDate && touched.toDate) ? "is-invalid" : ""} `}
                                                        />
                                                        <div className="input-group-addon">
                                                            <FontAwesomeIcon icon={faCalendar}/>
                                                        </div>

                                                        <div className="invalid-feedback ">

                                                            {
                                                                errors.toDate === 'required' ?
                                                                    <div className="pull-right"><Trans
                                                                        i18nKey="common.required"></Trans>
                                                                    </div> : ''
                                                            }

                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="form-actions form-group ">
                                                    <button type="submit" className="btn btn-primary btn-sm">
                                                        <Trans i18nKey="common.submit"></Trans>
                                                    </button>
                                                </div>
                                            </form>
                                        )
                                    }


                                </Formik>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header" style={{direction: 'ltr'}}>

                                <FontAwesomeIcon icon={faChartArea}/>
                                <strong className="card-title pl-2"><Trans i18nKey="dashboard.chart"></Trans> </strong>
                            </div>
                            <div className="card-body" style={{height:'700px'}}>
                                <Bar  data={this.data2} options={{
                                    // padding:2,
                                    responsive:true,
                                    maintainAspectRatio:false,
                                }}  />


                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header" style={{direction: 'ltr'}}>
                                <FontAwesomeIcon icon={faChartArea}/>
                                <strong className="card-title pl-2"><Trans i18nKey="dashboard.chart"></Trans> </strong>
                            </div>
                            <div className="card-body"  style={{height:'700px'}} >

                                    <Pie  data={this.data} options={{
                                        // padding:"2px",
                                        responsive:true,
                                        maintainAspectRatio:false,
                                        }}  />


                            </div>
                        </div>
                    </div>


                </div>


            </>
        )
            ;
    }
}


const mapStateToProps = (state:IReduxState) => {
    return {
        graphData: state.graph
    }
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {
        _query: (argument: string | number | object | null) => query(argument,dispatch),
        _save: (graph:Graph) => save(graph, dispatch),
        _error: (error:any) => newAlert(error, dispatch)
    }
}
export default connect(mapStateToProps,
    mapDispatchToProps)(withTranslation()(withRouter(GraphComponent)));