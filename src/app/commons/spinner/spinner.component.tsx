import React from 'react';
import './spinner.component.scss';
import { useSelector} from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import { IReduxState} from "../../interfaces/redux.type.interface";
import {IProps} from "../../interfaces/props.common.interface";

function Spinner (props:IProps) {
    const  spin = useSelector((item:IReduxState)=> item.spinner);
        return (
            <>

                <div className='fixedButton'>
                    <FadeLoader height={25} width={3} speedMultiplier={4} loading={spin}
                                cssOverride={{display: "block"}}/>
                </div>
            </>
        );
}

export default Spinner;
