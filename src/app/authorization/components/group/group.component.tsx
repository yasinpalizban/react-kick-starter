import React, {Component} from 'react';
import './group.component.scss';
import {Outlet} from 'react-router-dom' ;
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import withRouter from "../../../shared/utils/with.router";
import {IReduxDispatch, IReduxState} from "../../../shared/interfaces/redux.type.interface";
import {IPropsGroup, IStateGroup} from "../../interfaces/group.interface";

class GroupComponent extends Component <IPropsGroup,IStateGroup> {

    constructor(props: IPropsGroup | Readonly<IPropsGroup>) {
        super(props);

        this.state = {title: ''}
    }

    componentDidMount() {
        this.onChangeTitle();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.url !== this.props.url) {
            this.onChangeTitle();
        }
    }


    onChangeTitle() {

        switch (this.props.url) {
            case 'add':

                this.setState({
                    title: this.props.t('group.new')
                });
                break;
            case 'edit':
                this.setState({
                    title: this.props.t('group.edit')
                });
                break;
            case 'list':
                this.setState({
                    title: this.props.t('group.table')
                });

                break;
            case 'detail':
                this.setState({
                    title: this.props.t('group.detail')
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

const mapStateToProps = (state: IReduxState) => {
    return {url: state.urlPath}
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(GroupComponent)));
