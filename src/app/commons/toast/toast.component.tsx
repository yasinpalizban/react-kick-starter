import React, {Component} from 'react';
import {connect} from "react-redux";
import {removeToast} from "../../actions/toast.actions";
import withRouter from "../../utils/with.router";
import {IReduxDispatch, IReduxState} from "../../interfaces/redux.type.interface";
import {IPropsToast, IStateToast, IToast} from "../../interfaces/itoast";
import {isEmpty} from "../../utils/is.empty";

class ToastComponent extends Component <IPropsToast, IStateToast> {


    constructor(props: any) {
        super(props);
        this.removeToast = this.removeToast.bind(this);

    }



    removeToast = () => {
        if (isEmpty(this.props.toast)) {
            return;
        }
        setTimeout(() => {
            this.props._removeToast();
        }, 2500);

    }

    cssClass(): string {
        if (!this.props.toast) {
            return '';
        }
        const classes = ['toast', 'show'];
        return classes.join(' ');
    }

    render() {
        if (!isEmpty(this.props.toast)) {
            this.removeToast();
            return (
                <div className="position-fixed bottom-0 right-0 p-3" style={{zIndex: 5, right: 0, bottom: 0,}}>
                    <div className={this.cssClass()} role="alert" aria-live="assertive" aria-atomic="true"
                         data-delay="2000">
                        <div className="toast-header">
                            <strong className="mr-auto">   {this.props.toast.name}</strong>
                            <small>   {this.props.toast.time}</small>
                            <button type="button" className="ml-2 mb-1 close" onClick={this.removeToast}
                                    data-dismiss="toast" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="toast-body">
                            {this.props.toast.message}
                        </div>
                    </div>
                </div>);
        } else {
            return (<></>);
        }


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
