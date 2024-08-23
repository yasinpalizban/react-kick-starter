import React, {Component, useEffect} from 'react';
import {connect} from "react-redux";
import {removeToast} from "../../actions/toast.actions";
import withRouter from "../../utils/with.router";
import {IReduxDispatch, IReduxState} from "../../interfaces/redux.type.interface";
import {IPropsToast, IStateToast, IToast} from "../../interfaces/itoast";
import {isEmpty} from "../../utils/is.empty";

function ToastComponent(props: IPropsToast) {

    useEffect(() => {
        removeToasts = removeToasts.bind(props);
    }, [])


   let removeToasts = () => {
        if (isEmpty(props.toast)) {
            return;
        }
        setTimeout(() => {
            props._removeToast();
        }, 2500);

    }

    function cssClass(): string
    {
        if (!props.toast) {
            return '';
        }
        const classes = ['toast', 'show'];
        return classes.join(' ');
    }


    if (!isEmpty(props.toast)) {
        removeToasts();
        return (
            <div className="position-fixed bottom-0 right-0 p-3" style={{zIndex: 5, right: 0, bottom: 0,}}>
                <div className={cssClass()} role="alert" aria-live="assertive" aria-atomic="true"
                     data-delay="2000">
                    <div className="toast-header">
                        <strong className="mr-auto">   {props.toast.name}</strong>
                        <small>   {props.toast.time}</small>
                        <button type="button" className="ml-2 mb-1 close" onClick={removeToast}
                                data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        {props.toast.message}
                    </div>
                </div>
            </div>);
    } else {
        return (<></>);
    }


}

const mapStateToProps = (state: IReduxState) => {
    return {
        toast: state.toast
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _removeToast: () => removeToast(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToastComponent));
