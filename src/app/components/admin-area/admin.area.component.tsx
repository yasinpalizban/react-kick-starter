import React from 'react';
import './admin.area.component.scss';
import {Outlet} from 'react-router-dom' ;

import HeaderComponent from './header/header.component';
import FooterComponent from './fooder/footer.component';
import {useSelector} from "react-redux";
import {IReduxState} from "../../interfaces/redux.type.interface";
import {IProps} from "../../interfaces/props.common.interface";
import withRouter from "../../hooks/with.router";
import {fixControllerName} from "../../utils/fix.controller.name";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {Trans, withTranslation} from "react-i18next";


function AdminAreaComponent(props: IProps) {
    const language = useSelector((item: IReduxState) => item.language);
    const explodeLink = useSelector((item: IReduxState) => item.explodeLink);
    const url = useSelector((item: IReduxState) => item.urlPath);
    const getController = () => {
        return fixControllerName(explodeLink[1]?.toLowerCase());
    }

    const checkValidToShow = (type: string) => {
        const controller: string = getController();
        let flag = false;
        const arrayItem = ['dashboard', 'request-reply', 'chat'];
        arrayItem.forEach((item) => {
            if (item == controller) {
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


    return (
        <>
            <div className="page-wrapper">
                <div className="page-container2">
                    <HeaderComponent/>
                    <div dir={language === 'en' ? 'ltr' : 'rtl'}>
                        {
                            checkValidToShow('typeOne') ?
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
                                                                    className="card-title pl-2">
                                                                    {props.t(getController() + '.' + url)}
                                                                </strong>
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

    );
}

export default withTranslation()(withRouter(AdminAreaComponent));
