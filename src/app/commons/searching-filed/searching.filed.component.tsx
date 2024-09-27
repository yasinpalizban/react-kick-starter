import React, {useEffect, useRef} from 'react';
import './searching.filed.scss';
import { Trans,withTranslation} from "react-i18next";
import * as Yup from 'yup';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Formik, FormikState} from "formik";
import {createSearchParams} from 'react-router-dom'
import withRouter from "../../hooks/with.router";
import {IProps} from "../../interfaces/props.common.interface";

function SearchingFiledComponent(props: IProps & { onClickSearch: ()=>{}, searchFiled: any[] }) {

    const onHandleSubmit = async (values: { key: string; sort:string }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void) => {
        if(!values.key&& !values.sort){
            return;
        }
        const queryParam =  `?${values.sort}[lik]=${values?.key}`;
        props.navigate(
            {
                pathname: "../list",
                search:  queryParam,
            },
        );
        props.onClickSearch();
        setSubmitting(false);
    }
    const onNewItem = () => {
        const path = '../add';
        props.navigate(path);
    }


    return (<>


            <Formik
                initialValues={{
                    key: '',
                    sort:''
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    key: Yup.string()
                        .required('required'),


                })}
                onSubmit={(fields, {
                    setSubmitting,
                    resetForm
                }) => onHandleSubmit(fields, setSubmitting, resetForm)}>
                {
                    ({
                         values,
                         errors,
                         touched,
                         status,
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         isSubmitting,
                        setValues
                     }) => (
                      <>
                          <div className="row">
                              <div className="col-md-1 ">
                                  <div className="form-header">
                                      <div className=" "
                                           style={{display: 'inline-flex', marginTop: '15px', marginBottom: '15px'}}>
                                          <div className="rs-select2--light rs-select2--md">
                                              <select  onClick={handleChange} value={values?.sort}
                                                  className={`js-select2  ${(errors.key && touched.key) ? "is-invalid" : ""} `}
                                                  name="sort"  >
                                                  {props.searchFiled?.map((key:any, i:number) => {
                                                        if(key.name != '#')
                                                        return <option key={i} value={key.name.toLowerCase()}>{key.name}</option>
                                                  })}
                                              </select>
                                              <div className="dropDownSelect2"></div>
                                          </div>

                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-11 ">
                                  <div className="">
                                      <form onSubmit={handleSubmit} className="form-header"
                                            style={{justifyContent: 'flex-end'}}>
                                          <input  value={values.key} type="text" id="key"
                                                 name="key" required
                                                 className={`au-input au-input--style2 col-md-6 ${(errors.key && touched.key) ? "is-invalid" : ""} `}
                                                 placeholder={` ${props.t('common.searchBy')} `}
                                                 onChange={handleChange} onBlur={handleBlur}/>

                                          <OverlayTrigger
                                              delay={{hide: 300, show: 200}}
                                              overlay={(props) => (
                                                  <Tooltip >
                                                      <Trans i18nKey={'common.search'} />

                                                  </Tooltip>
                                              )}
                                              placement="top">
                                              <button
                                                  type="submit"
                                                  className="au-btn--submit" >
                                                  <FontAwesomeIcon icon={faSearch}/>
                                              </button>
                                          </OverlayTrigger>

                                          <OverlayTrigger
                                              delay={{hide: 300, show: 200}}
                                              overlay={(props) => (
                                                  <Tooltip >
                                                      <Trans i18nKey={'permissionUser.new'} />

                                                  </Tooltip>
                                              )}
                                              placement="top">
                                              <button type="button"
                                                      onClick={onNewItem}
                                                      className="au-btn au-btn-icon au-btn&#45;&#45;green au-btn&#45;&#45;small">
                                                  <FontAwesomeIcon icon={faPlus}/>
                                              </button>
                                          </OverlayTrigger>

                                      </form>

                                  </div>

                              </div>

                          </div>

                      </>
                    )
                }

            </Formik>

        </>
    )
        ;

}


export default withTranslation()(withRouter(SearchingFiledComponent));
