import React, {Component} from 'react';
import './footer.component.scss';
import ToastComponent from "../../../commons/toast/toast.component";

function FooterComponent (props:any)  {
        return (

            <>
                <ToastComponent />
                <section>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="copyright">

                                    <p>Copyright © 2023 yasin palizban. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );

}

export default FooterComponent;
