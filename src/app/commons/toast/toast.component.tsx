import React, { useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {removeToast} from "../../actions/toast.actions";
import withRouter from "../../hooks/with.router";
import { IReduxState} from "../../interfaces/redux.type.interface";
import {isEmpty} from "../../utils/is.empty";
import {IProps} from "../../interfaces/props.common.interface";
import {IToast} from "../../interfaces/itoast";

function ToastComponent(props: IProps) {
  const dispatch=useDispatch();
  const toast:IToast= useSelector((item:IReduxState)=> item.toast);
    useEffect(() => {
        onRemoveToasts = onRemoveToasts.bind(props);
    }, [])


   let onRemoveToasts = () => {
        if (isEmpty(toast)) {
            return;
        }
        setTimeout(() => {
            removeToast(dispatch);
        }, 2500);

    }

    function cssClass(): string
    {
        if (!toast) {
            return '';
        }
        const classes = ['toast', 'show'];
        return classes.join(' ');
    }


    if (!isEmpty(toast)) {
        onRemoveToasts();
        return (
            <div className="position-fixed bottom-0 right-0 p-3" style={{zIndex: 5, right: 0, bottom: 0,}}>
                <div className={cssClass()} role="alert" aria-live="assertive" aria-atomic="true"
                     data-delay="2000">
                    <div className="toast-header">
                        <strong className="mr-auto">   {toast.name}</strong>
                        <small>   {toast.time}</small>
                        <button type="button" className="ml-2 mb-1 close" onClick={onRemoveToasts}
                                data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        {toast.message}
                    </div>
                </div>
            </div>);
    } else {
        return (<></>);
    }


}



export default withRouter(ToastComponent);
