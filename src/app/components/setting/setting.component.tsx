import React, {Component} from 'react';
import './setting.component.scss';
import {Outlet} from 'react-router-dom' ;
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { withTranslation} from "react-i18next";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import withRouter from "../../utils/with.router";
import {IReduxDispatch, IReduxState} from "../../interfaces/redux.type.interface";
import {IPropsSetting, IStateSetting} from "../../interfaces/setting.interface";

class SettingComponent extends Component <IPropsSetting, IStateSetting> {

    constructor(props: IPropsSetting | Readonly<IPropsSetting>) {
        super(props);

        this.state = {title: ''}
    }

    componentDidMount() {
        this.onChangeTitle();
    }

    componentDidUpdate(prevProps: { url: any; }, prevState: any, snapshot: any) {
        if (prevProps.url !== this.props.url) {
            this.onChangeTitle();
        }
    }


    onChangeTitle() {

        switch (this.props.url) {
            case 'add':

                this.setState({
                    title: this.props.t('setting.new')
                });
                break;
            case 'edit':
                this.setState({
                    title: this.props.t('setting.edit')
                });
                break;
            case 'list':
                this.setState({
                    title: this.props.t('setting.table')
                });

                break;
            case 'detail':
                this.setState({
                    title: this.props.t('setting.detail')
                });
                break;

        }

    }


    render() {
        return (
            <>

                <section className="statistic">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">


                            <div className="row">

                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header" style={{direction: 'ltr'}}>
                                            <FontAwesomeIcon icon={faList}/>
                                            <strong className="card-title pl-2"> {this.state.title} </strong>
                                        </div>
                                        <div className="card-body ">
                                            <Outlet/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </>

        )
            ;
    }
}

const mapStateToProps = (state:IReduxState) => {
    return {url: state.urlPath}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(SettingComponent)));
