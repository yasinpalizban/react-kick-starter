import {AlertType} from '../../enums/alert.enum';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {removeAlert} from "../../actions/alert.actions";
import withRouter from "../../utils/with.router";
import {IReduxDispatch, IReduxState} from "../../interfaces/redux.type.interface";
import {IAlert, IPropsAlert, IStateAlert} from "../../interfaces/ialert";

function AlertComponent (props: IPropsAlert) {
    const id: string ='default-alert';

  const  removeAlert = (event: any) => {
        const obj: any = {};
        if(event){
            obj.id = event.currentTarget.getAttribute('data-value');
        }else{
            obj.id = id;
        }
        setTimeout(() => {
            props._removeAlert(obj);
        }, 3000);
    }

  const  cssClass = (alert: any) => {

        const classes:any[] = ['alert', 'alert-dismissible', 'with-close', 'sufee-alert' , 'show', 'fade'];
        const alertTypeClass:any = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        };
        classes.push(alertTypeClass[alert.type]);

        return classes.join(' ');
    }

        if (props.alert) {

            return props.alert.map((alert: any, i: any) => {
                const classAlert = cssClass(alert);
                removeAlert(null);
                return (
                    <div className={classAlert} key={i}>
                        {alert.message}

                        {alert.body.map((body: any, j: any) => <div key={j}> {body}</div>)}

                        <button data-value={alert.id} onClick={removeAlert} type="button" className="close">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>)
            });
        } else {
            return (<></>);
        }

}

const mapStateToProps = (state: IReduxState) => {
    return {
        alert: state.alert
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _removeAlert: (alert: IAlert) => removeAlert(alert, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlertComponent));
