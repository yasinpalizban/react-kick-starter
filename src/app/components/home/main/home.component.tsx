import React, {Component} from 'react';
import './home.component.scss';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import withRouter from "../../../utils/with.router";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsHome, IStateHome} from "../../../interfaces/home.interface";
import { settingList} from '../../../actions/home.actions';

class HomeComponent extends Component <IPropsHome, IStateHome> {

    constructor(props: IPropsHome | Readonly<IPropsHome>) {
        super(props);

    }

    async componentDidMount() {
        await this.props._settingList();
        await this.props._settingList();
    }
    //  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    //     console.log(prevProps.home !== this.props.home);
    //     console.log(this.props.home);
    //     console.log(prevProps.home );
    //     if ( prevProps.home !== this.props.home) {
    //
    //     }
    //
    //
    // }

    render() {
        return (
            <>

                <main id="main">


                </main>

            </>

        )
            ;
    }
}

const mapStateToProps = (state: IReduxState) => {
    return {home: state.home}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _settingList: () => settingList(null, dispatch),


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HomeComponent)));
