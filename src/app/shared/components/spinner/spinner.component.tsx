import React, {Component} from 'react';
import './spinner.component.scss';
import {connect} from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import {IReduxAction, IReduxDispatch, IReduxState} from "../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../interfaces/props.common.interface";
import {IStateCommon} from "../../interfaces/state.common.interface";

class Spinner extends Component<IPropsCommon,IStateCommon> {
    constructor(props: IPropsCommon | Readonly<IPropsCommon>) {
        super(props);

    }


    render() {
        return (
            <>

                <div className='fixedButton'>
                    <FadeLoader height={25} width={3} speedMultiplier={4} loading={this.props.spinner}
                                cssOverride={{display: "block"}}/>
                </div>

            </>

        );
    }
}

const mapStateToProps = (state: IReduxState) => {
    return {spinner: state.spinner}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
