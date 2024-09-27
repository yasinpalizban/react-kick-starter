import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState} from 'react';
import './modal.component.scss';
import {Trans} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Modal} from 'react-bootstrap';


function ModalComponent(props: {onClickConfirm:any,show:boolean, title:string}) {
    const [show, setShow] = useState(false);
    useEffect(()=>{
     setShow(props.show);
    },[props]);

    const onModalHide = () => {
        setShow(false);
    }
    const onModalConfirm = async () => {
        setShow(false);
        props.onClickConfirm();
    }


    return (<>
        <Modal show={show}>
            <div className="modal-header align-items-center">
                <FontAwesomeIcon icon={faTrash}/> &nbsp;&nbsp;
                <h4 className="modal-title pull-left"><Trans i18nKey="common.remove"></Trans></h4>

                <button type="button" className="close pull-right" aria-label="Close" onClick={onModalHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p><Trans i18nKey="common.doYouWantDelete"></Trans> <strong
                    className="text-danger">{props.title}</strong></p>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onModalHide}><Trans
                    i18nKey="common.cancel"></Trans></button>
                <button type="button" className="btn btn-primary" onClick={onModalConfirm}><Trans
                    i18nKey="common.confirm"></Trans></button>
            </div>
        </Modal>

    </>)
        ;

}


export default ModalComponent;



