import {RoleType} from "../../enums/role.enum";
import React, {Component} from 'react';
import './forbidden-page.component.scss';
import withRouter from "../../utils/with.router";
import {IPropsCommon} from "../../interfaces/props.common.interface";
import {IStateCommon} from "../../interfaces/state.common.interface";

class ForbiddenPageComponent extends Component <IPropsCommon,IStateCommon>{

    constructor(props: IPropsCommon | Readonly<IPropsCommon>) {
        super(props);
    }

    componentDidMount() {

        // const user = JSON.parse(localStorage.getItem('user')!);
        // let pathRedirect = '/admin/dashboard/over-view';
        // if (user.role.name === RoleType.Member) {
        //     pathRedirect =  '/admin/profile';
        // }
        const  pathRedirect =  '/admin/profile';
        setTimeout(() => {
            this.props.navigate(pathRedirect,{replace: true});
        }, 2000);
    }


    render() {

        return (
            <>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>Oops!</h1>
                        </div>
                        <h2>403 - Forbidden page </h2>
                        <p>The page you are looking for have been forbidden , it is unavailable.</p>
                        <p>Redirect After 2 seconds... </p>

                    </div>
                </div>

            </>

        );
    }

}

export default withRouter(ForbiddenPageComponent);

