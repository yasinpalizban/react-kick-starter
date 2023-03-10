import {useParams, useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router'
import React from 'react';

export default function withRouter(Component:any) {
    function ComponentWithRouterProp(props:any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return (
            <Component {...props} location={location} params={params} navigate={navigate} />
        );
    }

    return ComponentWithRouterProp;
}


