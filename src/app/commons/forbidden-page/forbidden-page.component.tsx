
import React, { useEffect} from 'react';
import './forbidden-page.component.scss';
import withRouter from "../../hooks/with.router";
import {IProps} from "../../interfaces/props.common.interface";

function ForbiddenPageComponent (props:IProps){
     useEffect(()=>{
         // const user = JSON.parse(localStorage.getItem('user')!);
         // let pathRedirect = '/admin/dashboard/over-view';
         // if (user.role.name === RoleType.Member) {
         //     pathRedirect =  '/admin/profile';
         // }
         const  pathRedirect =  '/admin/profile';
         setTimeout(() => {
             props.navigate(pathRedirect,{replace: true});
         }, 2000);
     },[])

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

export default withRouter(ForbiddenPageComponent);

