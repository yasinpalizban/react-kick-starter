import React, {Component} from 'react';
import './admin.area.component.scss';
import {Outlet} from 'react-router-dom' ;

import HeaderComponent from './header/header.component';
import FooterComponent from './fooder/footer.component';
import {connect} from "react-redux";
import {IReduxDispatch, IReduxState} from "../../interfaces/redux.type.interface";
import {IStateCommon} from "../../interfaces/state.common.interface";
import {IPropsCommon} from "../../interfaces/props.common.interface";
import withRouter from "../../utils/with.router";
import {fixControllerName} from "../../utils/fix.controller.name";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {withTranslation} from "react-i18next";


class AdminAreaComponent extends Component<IPropsCommon, IStateCommon> {

    controller: string = '';
    title: string = 'none';
    component: string = '';

    constructor(props: IPropsCommon | Readonly<IPropsCommon>) {
        super(props);
    }


    checkValidToShow = (type: string) => {
        this.controller = fixControllerName(this.props.explodeLink[1]?.toLowerCase());
        this.title = this.props.t(this.controller + '.' + this.props.url);

        let flag = false;
        const arrayItem = ['dashboard', 'request-reply', 'chat'];
        arrayItem.map((item) => {
            if (item == this.controller) {
                flag = true;
            }
        });
        if ('typeOne' == type && flag) {
            return true;
        } else if (type == 'typeTwo' && !flag) {
            return true;
        }

        return false;
    }

    render() {

        return (
            <>
                <div className="page-wrapper">
                    <div className="page-container2">
                        <HeaderComponent/>
                        <div dir={this.props.language === 'en' ? 'ltr' : 'rtl'}>
                            {
                                this.checkValidToShow('typeOne') ?
                                    (<section className="statistic">
                                        <div className="section__content section__content--p30">
                                            <div className="container-fluid">
                                                <Outlet/>
                                            </div>
                                        </div>
                                    </section>) : (
                                        <section className="statistic">
                                            <div className="section__content section__content--p30">
                                                <div className="container-fluid">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="card">
                                                                <div className="card-header" style={{direction: 'ltr'}}>
                                                                    <FontAwesomeIcon icon={faList}/>
                                                                    <strong
                                                                        className="card-title pl-2">  {this.title} </strong>
                                                                </div>
                                                                <div className="card-body">
                                                                    <Outlet/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    )
                            }
                        </div>
                        <FooterComponent/>
                    </div>

                </div>

            </>

        )
            ;
    }
}

const mapStateToProps = (state: IReduxState) => {
    return {
        language: state.language,
        url: state.urlPath,
        explodeLink: state.explodeLink
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(AdminAreaComponent)));
