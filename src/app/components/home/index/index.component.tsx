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
