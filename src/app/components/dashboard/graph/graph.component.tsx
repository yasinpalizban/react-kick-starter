import React, {Component, useEffect} from 'react';
import './graph.component.scss';
import {connect, useDispatch, useSelector} from "react-redux";
import {Trans, withTranslation} from "react-i18next";
import withRouter from "../../../hooks/with.router";
import {retrieve, save} from '../../../actions/graph.actions';
import {faAsterisk, faCalendar, faChartArea, faList} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Formik, FormikState} from "formik";
import * as Yup from "yup";
import AlertComponent from "../../../commons/alert/alert.component";
import {getDateByName} from "../../../utils/get.date.by.name";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from 'chart.js';
import {Pie, Bar} from 'react-chartjs-2';
import {alertError} from "../../../utils/alert.functions";
import { IReduxState} from "../../../interfaces/redux.type.interface";
import {IGraph} from "../../../interfaces/graph.interface";
import {IProps} from "../../../interfaces/props.common.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";


function GraphComponent (props: IProps ) {
 const graphData:IResponseObject<IGraph[]> =  useSelector((item:IReduxState)=> item.graph);
    const dispatch=useDispatch();
    useEffect(()=>{
        (async ()=>{
            await retrieve(dispatch);
        })();
    },[])


    let data2:any={
        labels: ['January'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [100],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },

        ],
    };

    let data:any={
        labels: ['Red'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    let options:any= {
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




        ChartJS.register(
            ArcElement,
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend,
        );




   const handleSubmit = async (values: { _type?: string; toDate: any; fromDate: any; date: any; value?: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ _type: string; toDate: string; fromDate: string; date: string; }>> | undefined) => void) => {

        if ((!values?.date || values?.date === 'none') &&
            !values?.fromDate &&
            !values?.toDate) {
            const error = alertError(props.t('error.selectDate'));
            alert(error);
            return;
        }


        const fromDate = values.fromDate.length > 0 ? values.fromDate : getDateByName(values.date);
        const toDate = values.toDate.length > 0 ? values.toDate : getDateByName('today');


        await save(dispatch,{
            type: values._type,
            toDate: toDate.replace("\//", "-"),
            fromDate: fromDate.replace("\//", "-")
        });

    }
        let labels: string[] = [];
        let datasets: object[] = [];
        let dataRows: number[] = [];
        let backgroundColor: string[] = [];
        const colors:string[]= ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Pink', 'Brown', 'Gray','Black','Silver'];
        let indexColor= 0;

        graphData.data?.map((key, i) => {
            labels.push(key.name);
            dataRows.push(Number(key.value));
            backgroundColor.push(colors[indexColor]);
            datasets.push({
                label: key.name,
                data: [Number(key.value)],
                backgroundColor: colors[indexColor],
            });
            indexColor= indexColor>= colors.length-1 ?0 :indexColor+1;
        });


        data2 = {
            labels:labels,
            datasets: datasets,
        };

        data = {
            labels:labels,
            datasets: [
                {
                    label: '# Data',
                    data: dataRows,
                    backgroundColor: backgroundColor,
                    borderColor: backgroundColor,
                    borderWidth: 1,
                },
            ],
        };
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
                                    }) => handleSubmit(fields, setSubmitting, resetForm)}>
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
                                                                    value="default"> {props.t('common.selectInputMessage')} </option>
                                                            <option
                                                                value="news">  {props.t("dashboard.news")} </option>
                                                            <option
                                                                value="visitor"> {props.t("dashboard.visitor")} </option>
                                                            <option
                                                                value="request">  {props.t("dashboard.request")}</option>
                                                            <option
                                                                value="jobPost">  {props.t("dashboard.jobPost")}</option>
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
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header" style={{direction: 'ltr'}}>
                                <FontAwesomeIcon icon={faChartArea}/>
                                <strong className="card-title pl-2"><Trans i18nKey="dashboard.chart"></Trans> </strong>
                            </div>
                            <div className="card-body"  style={{height:'700px'}} >

                                <Pie  data={data} options={{
                                    // padding:"2px",
                                    responsive:true,
                                    maintainAspectRatio:false,
                                }}  />


                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header" style={{direction: 'ltr'}}>

                                <FontAwesomeIcon icon={faChartArea}/>
                                <strong className="card-title pl-2"><Trans i18nKey="dashboard.chart"></Trans> </strong>
                            </div>
                            <div className="card-body" style={{height:'700px'}}>
                                <Bar  data={data2} options={{
                                    // padding:2,
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

export default withTranslation()(withRouter(GraphComponent));
