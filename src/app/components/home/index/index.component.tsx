import React, {Component, useEffect} from 'react';
import {useNavigate} from "react-router";

export default function IndexComponent() {
    let navigate = useNavigate();
    useEffect(() => {
        navigate('home/main');
    }, [navigate])

    return (
        <></>
    );
}

// class IndexComponent extends Component <IPropsCommon, IStateCommon> {
//     constructor(props: IPropsCommon | Readonly<IPropsCommon>) {
//         super(props);
//     }
//
//     componentDidUpdate(prevProps: Readonly<IPropsCommon>, prevState: Readonly<IStateCommon>, snapshot?: any) {
//         this.props.navigate('home/main');
//     }
//
//     render() {
//
//         return <></>;
//     }
//
//
// }
//
// export default withRouter(IndexComponent);

