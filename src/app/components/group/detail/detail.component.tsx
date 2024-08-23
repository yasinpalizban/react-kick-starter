import React, {Component, useEffect} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {detail} from "../../../actions/group.actions";
import {connect} from "react-redux";
import withRouter from '../../../utils/with.router';

import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsGroup} from "../../../interfaces/group.interface";

function DetailComponent (props: IPropsGroup ) {

    useEffect(()=>{
        (async ()=>{
            await props._detail( +props.params.id);
        })();
    },[])



        const {group} =props;
        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.name"></Trans>
                        </td>
                        <td>{group.data?.name}</td>
                    </tr>


                    <tr>
                        <td>
                            <Trans i18nKey="filed.description"></Trans>
                        </td>
                        <td>{group.data?.description}</td>
                    </tr>

                    </tbody>
                </table>
            </div>


        );

}


const mapStateToProps = (state: IReduxState) => {
    return {
        group: state.groupSelect
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _detail: (argument:  number | null) => detail(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
