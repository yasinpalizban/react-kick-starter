import React, {Component} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {query} from "../../../actions/group.actions";
import {connect} from "react-redux";
import withRouter from '../../../utils/with.router';

import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsGroup, IStateGroup} from "../../../interfaces/group.interface";

class DetailComponent extends Component <IPropsGroup, IStateGroup> {
    id: number;

    constructor(props: IPropsGroup | Readonly<IPropsGroup>) {
        super(props);
        this.id = 0;
    }

    async componentDidMount() {
        this.id = +this.props.params.id;
        await this.props._query(this.id);
    }


    render() {

        const {groupDetail} = this.props;
        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.name"></Trans>
                        </td>
                        <td>{groupDetail.data![0].name}</td>
                    </tr>


                    <tr>
                        <td>
                            <Trans i18nKey="filed.description"></Trans>
                        </td>
                        <td>{groupDetail.data![0].description}</td>
                    </tr>

                    </tbody>
                </table>
            </div>


        );
    }
}


const mapStateToProps = (state: IReduxState) => {
    return {
        groupDetail: state.group
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
