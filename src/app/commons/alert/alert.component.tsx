import {AlertType} from '../../enums/alert.enum';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeAlert} from "../../actions/alert.actions";
import withRouter from "../../hooks/with.router";
import {IReduxState} from "../../interfaces/redux.type.interface";
import {IProps} from "../../interfaces/props.common.interface";
import {IAlert} from "../../interfaces/ialert";

function AlertComponent(props: IProps) {
    const useRefBtn=useRef<HTMLButtonElement>(null);
    const id: string = 'default-alert';
    const alerts: IAlert[] = useSelector((item: IReduxState) => item.alert);
    const dispatch = useDispatch();
    useEffect(()=>{
        onRemoveAlert=onRemoveAlert.bind(props);
    },[props]);
    let onRemoveAlert = () => {
        const obj: any = {};
            obj.id = useRefBtn?.current?.getAttribute('data-value')|| id;
        setTimeout(() => {
            removeAlert(dispatch, obj);
        }, 3000);
    }

    const cssClass = (alert: any) => {

        const classes: any[] = ['alert', 'alert-dismissible', 'with-close', 'sufee-alert', 'show', 'fade'];
        const alertTypeClass: any = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        };
        classes.push(alertTypeClass[alert.type]);

        return classes.join(' ');
    }

    if (alerts.length) {
        onRemoveAlert();
        return alerts.map((alert: any, i: any) => {
            const classAlert = cssClass(alert);

            return (
                <>
                    <div className={classAlert} key={i}>
                        {alert.message}

                        {alert.body.map((body: any, j: any) => <div key={j}> {body}</div>)}

                        <button  ref={useRefBtn} data-value={alert.id} onClick={onRemoveAlert} type="button" className="close">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>
                </>)
        });

    } else {
        return (<></>);
    }

}

export default withRouter(AlertComponent);
