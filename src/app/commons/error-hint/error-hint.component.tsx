import React, {useEffect} from 'react';
import {Trans} from "react-i18next";

function ErrorHintComponent(props: { errors: any, name: string }) {
    useEffect(() => {
    }, [props])

    return (
        <>
            <div className="invalid-feedback ">
                {
                    props.errors[props.name] === 'required' ?
                        <div className="pull-right"> this item is required
                        </div> : ''
                }
                {props.errors[props.name] === 'maxlength' ?
                    <div className="pull-right"> you are pass max length
                    </div> : ''
                }
                {props.errors[props.name] === 'minlength' ?
                    <div className="pull-right"> you are not reach min length
                    </div> : ''
                }
                {props.errors[props.name] === 'equal' ?
                    <div className="pull-right"> fields are not equal
                    </div> : ''
                }
            </div>
        </>

    )
        ;

}

export default ErrorHintComponent;

