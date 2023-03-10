import React, { Component } from 'react';
import './over.view.component.scss';
import {AuthContext} from "../../../authentication/contexts/auth.context";
import {connect} from "react-redux";
import {Trans, withTranslation} from "react-i18next";
import withRouter from "../../../shared/utils/with.router";
import {query} from "../../actions/over.view.actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {IReduxDispatch, IReduxState} from "../../../shared/interfaces/redux.type.interface";
import {IPropsOverView, IStateOerView} from "../../interfaces/over.view.interface";
class OverViewComponent extends Component<IPropsOverView,IStateOerView> {
  constructor(props: IPropsOverView | Readonly<IPropsOverView>) {

    super(props);
  }
  async componentDidMount() {
    await this.props._query(null);
  }

  render() {
    const {overViewRows}= this.props;

    return (
     <>
       <div className="row">
         <div className="col-md-6 col-lg-3">
           <div className="statistic__item statistic__item--green text-lg-center "
                style={{borderRadius: '20px',  textAlign: 'center'}}>
             <h2 className="number" style={{marginTop: '45px'}}>{overViewRows.countPost?.users}</h2>
             <span className="desc" style={{color: 'black'}}><Trans i18nKey="dashboard.user"></Trans></span>
           </div>
         </div>
         <div className="col-md-6 col-lg-3">
           <div className="statistic__item statistic__item--orange text-lg-center"
                style={{borderRadius: '20px',  textAlign: 'center'}}>
             <h2 className="number" style={{marginTop: '45px'}}>{overViewRows.countPost?.news}</h2>
             <span className="desc" style={{color: 'black'}}><Trans i18nKey="dashboard.news"></Trans></span>

           </div>
         </div>
         <div className="col-md-6 col-lg-3">
           <div className="statistic__item statistic__item--blue text-lg-center"
                style={{borderRadius: '20px',  textAlign: 'center'}}>
             <h2 className="number" style={{marginTop: '45px'}}>{overViewRows.countPost?.contacts}</h2>
             <span className="desc" style={{color: 'black'}}><Trans i18nKey="dashboard.contact"></Trans></span>
           </div>
         </div>
         <div className="col-md-6 col-lg-3">
           <div className="statistic__item statistic__item--red text-lg-center "
                style={{borderRadius: '20px',  textAlign: 'center'}}>
             <h2 className="number " style={{marginTop: '45px'}}>{overViewRows.countPost?.visitors}</h2>
             <span className="desc" style={{color: 'black'}}><Trans i18nKey="dashboard.visitor"></Trans></span>

           </div>
         </div>
       </div>


       <div className="row">
         <div className="col-md-6 col-lg-3">
           <div className="statistic__item statistic__item--green text-lg-center "
                style={{borderRadius: '20px',  textAlign: 'center'}}>
             <h2 className="number" style={{marginTop: '45px'}}>{overViewRows.countPost?.contacts}</h2>
             <span className="desc" style={{color: 'black'}}><Trans i18nKey="dashboard.contact"></Trans></span>
           </div>
         </div>

       </div>




       <div className="row">
       <div className="col-md-12">
         <div className="card">
           <div className="card-header" style={{direction: 'ltr'}}>
             <FontAwesomeIcon icon={faList}/>
           <strong className="card-title pl-2"><Trans i18nKey="dashboard.request"></Trans></strong>
         </div>
         <div className="card-body">

           <div className="table-responsive m-b-40">
             <table className="table table-borderless table-data3">
               <thead>
               <tr>
                 <th>#</th>
                 <th><Trans i18nKey="filed.title"></Trans></th>
                 <th><Trans i18nKey="filed.create"></Trans></th>

               </tr>
               </thead>
               <tbody>
               {
                 overViewRows.requestPost?.map((data,i:number)=>{
                   return (<tr  key={i}>
                     <td>{i + 1}</td>
                     <td>{data.title.substr(0, 150)}</td>
                     <td>{moment(data.createdAt).format('YYYY-MM-DD')}</td>
                   </tr>)
                 })
               }
             </tbody>
           </table>
         </div>

       </div>
     </div>
  </div>


  </div>


    <div className="row" >

        <div className="col-md-12">
        <div className="card">
        <div className="card-header" style={{direction: 'ltr'}}>
          <FontAwesomeIcon icon={faList}/>
    <strong className="card-title pl-2"><Trans i18nKey="dashboard.contact"></Trans> </strong>
  </div>
    <div className="card-body">

      <div className="table-responsive m-b-40">
        <table className="table table-borderless table-data3">
          <thead>
          <tr>
            <th>#</th>
            <th><Trans i18nKey="filed.title"></Trans></th>
            <th><Trans i18nKey="filed.create"></Trans></th>
          </tr>
          </thead>
          <tbody>
          {
            overViewRows.contactPost?.map((data,i:number)=>{
              return (<tr  key={i}>
                <td>{i + 1}</td>
                <td>{data.title.substr(0, 150)}</td>
                <td>{moment(data.createdAt).format('YYYY-MM-DD')}</td>
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>

  </div>
  </div>
  </div>


  </div>

    <div className="row" >

        <div className="col-md-12">
        <div className="card">
        <div className="card-header" style={{direction: 'ltr'}}>
          <FontAwesomeIcon icon={faList}/>
    <strong className="card-title pl-2"><Trans i18nKey="dashboard.news"></Trans> </strong>
  </div>
    <div className="card-body">

      <div className="table-responsive m-b-40">
        <table className="table table-borderless table-data3">
          <thead>
          <tr>
            <th>#</th>
            <th><Trans i18nKey="filed.title"></Trans></th>
            <th><Trans i18nKey="filed.create"></Trans></th>
          </tr>
          </thead>
          <tbody>
          {
            overViewRows.newsPost?.map((data,i:number)=>{
              return (<tr  key={i}>
                <td>{i + 1}</td>
                <td>{data.title.substr(0, 150)}</td>
                <td>{moment(data.createdAt).format('YYYY-MM-DD')}</td>
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>

  </div>
  </div>
  </div>


  </div>

    <div className="row" >

        <div className="col-md-12">
        <div className="card">
        <div className="card-header" style={{direction: 'ltr'}}>
          <FontAwesomeIcon icon={faList}/>
    <strong className="card-title pl-2"><Trans i18nKey="dashboard.visitor"></Trans></strong>
  </div>
    <div className="card-body">

      <div className="table-responsive m-b-40">
        <table className="table table-borderless table-data3">
          <thead>
          <tr>
            <th>#</th>
            <th><Trans i18nKey="filed.country"></Trans></th>
            <th><Trans i18nKey="filed.create"></Trans></th>

          </tr>
          </thead>
          <tbody>
          {
            overViewRows.visitorPost?.map((data,i:number)=>{
              return (<tr  key={i}>
                <td>{i + 1}</td>
                <td>{data.country.substr(0, 150)}</td>
                <td>{moment(data.createdAt).format('YYYY-MM-DD')}</td>
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>

  </div>
  </div>
  </div>


  </div>

    <div className="row" >

        <div className="col-md-12">
        <div className="card">
        <div className="card-header" style={{direction: 'ltr'}}>
          <FontAwesomeIcon icon={faList}/>
    <strong className="card-title pl-2"> <Trans i18nKey="dashboard.user"></Trans> </strong>
  </div>
    <div className="card-body">

      <div className="table-responsive m-b-40">
        <table className="table table-borderless table-data3">
          <thead>
          <tr>
            <th>#</th>

            <th><Trans i18nKey="filed.userName"></Trans></th>
            <th><Trans i18nKey="filed.create"></Trans></th>
          </tr>
          </thead>
          <tbody>
          {
            overViewRows.newsPost?.map((data,i:number)=>{
             return ( <tr  key={i}>
               <td>{i + 1}</td>
               <td>{data.username.substr(0, 150)}</td>
               <td>{moment(data.createdAt).format('YYYY-MM-DD')}</td>
             </tr>)
            })
          }
        </tbody>
      </table>
    </div>

  </div>
  </div>
  </div>


  </div>

     </>
    );
  }
}


const mapStateToProps = (state:IReduxState) => {
  return {
    overViewRows:state.overView
  }
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
  return {
    _query:(argument: string | number | object | null)=> query(argument,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(OverViewComponent)));
