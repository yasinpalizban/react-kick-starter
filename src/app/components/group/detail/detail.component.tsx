import React, {Component} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {detail} from "../../../actions/group.actions";
import {connect} from "react-redux";
import withRouter from '../../../utils/with.router';

import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsGroup, IStateGroup} from "../../../interfaces/group.interface";

class DetailComponent extends Component <IPropsGroup, IStateGroup> {

    constructor(props: IPropsGroup | Readonly<IPropsGroup>) {
        super(props);
    }

    async componentDidMount() {
        await this.props._detail( +this.props.params.id);
    }


    render() {
        const {group} = this.props;
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
