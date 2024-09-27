import React from 'react';
import './not-found-page.component.scss';
import {IProps} from "../../interfaces/props.common.interface";
import withRouter from "../../hooks/with.router";

function NotFoundPageComponent (props:IProps) {

        return (
            <>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>Oops!</h1>
                        </div>
                        <h2>404 - Page not found</h2>
                        <p>The page you are looking for might have been removed had its name changed or is temporarily
                            unavailable.</p>

                    </div>
                </div>

            </>

        )
            ;

}

export default withRouter(NotFoundPageComponent);

