import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './modal.component.scss';
import {Trans} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Modal} from 'react-bootstrap';


class ModalComponent extends Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            show: this.props.show,
            title: this.props.title,
            onClickConfirm: this.props.onClickConfirm
        }
    }

    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any) {
        this.setState({
            show: nextProps.show,
            title: nextProps.title
        });
    }


    onModalHide = () => {
        this.setState({
            show: false,
        });
    }
    onModalConfirm = async () => {
        this.setState({
            show: false,
        });
        this.props.onClickConfirm();
    }

    render() {

        return (<>
            <Modal show={this.state.show}>
                <div className="modal-header align-items-center">
                    <FontAwesomeIcon icon={faTrash}/> &nbsp;&nbsp;
                    <h4 className="modal-title pull-left"><Trans i18nKey="common.remove"></Trans></h4>

                    <button type="button" className="close pull-right" aria-label="Close" onClick={this.onModalHide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p><Trans i18nKey="common.doYouWantDelete"></Trans> <strong
                        className="text-danger">{this.state.title}</strong></p>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.onModalHide}><Trans
                        i18nKey="common.cancel"></Trans></button>
                    <button type="button" className="btn btn-primary" onClick={this.onModalConfirm}><Trans
                        i18nKey="common.confirm"></Trans></button>
                </div>
            </Modal>

        </>)
            ;
    }
}


export default ModalComponent;



