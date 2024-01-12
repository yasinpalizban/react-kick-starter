import React, {Component} from 'react';
import {AuthContext} from "../contexts/auth.context";
import {isValidToPassAuth} from "../utils/is.valid.to.pass.auth";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEnvelopeOpen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {PermissionType} from "../enums/permission.enum";

interface IAuthAction {
    children?:any;
    permissionType: string;
    permissionName: string;
    id: number;
    index: number;
    label: string;
    onClick: any;
}

class AuthCommonComponent extends Component<IAuthAction, any> {
    static contextType = AuthContext;

    constructor(props: IAuthAction) {
        super(props);
    }

    onItemAction() {

        if (this.props.permissionType == PermissionType.Get) {
            return (<FontAwesomeIcon icon={faEnvelopeOpen}/>)
        } else if (this.props.permissionType == PermissionType.Put) {
            return (<FontAwesomeIcon icon={faEdit}/>)
        } else if (this.props.permissionType == PermissionType.Delete) {
            return (<FontAwesomeIcon icon={faTrash}/>)
        } else {
            return (<> not define</>)
        }
    }

    render() {

        if (isValidToPassAuth(this.props.permissionName!, this.props.permissionType!, this.context!)) {
            return (<>
                <OverlayTrigger
                    delay={{hide: 300, show: 200}}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            {this.props.label}
                        </Tooltip>
                    )}
                    placement="top">
                    <button
                        onClick={this.props.onClick} className="item"
                        data-value={this.props.id}
                        data-index={this.props.index}>
                        {
                            this.onItemAction()
                        }

                    </button>
                </OverlayTrigger>
            </>)
        } else {
            return (<> </>);
        }
    }
}

export default AuthCommonComponent;

