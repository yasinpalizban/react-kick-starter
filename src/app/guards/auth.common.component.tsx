import React, {useContext} from 'react';
import {AuthContext} from "../contexts/auth.context";
import {isValidToPassAuth} from "../utils/is.valid.to.pass.auth";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEnvelopeOpen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {PermissionType} from "../enums/permission.enum";
import {IAuth} from "../interfaces/authenticate.interface";

interface IAuthAction {
    children?:any;
    permissionType: string;
    permissionName: string;
    id: number;
    index: number;
    label: string;
    onClick: any;
}

function AuthCommonComponent(props: IAuthAction) {
    const contextType:IAuth = useContext(AuthContext);
  const  onItemAction=()=> {

        if (props.permissionType == PermissionType.Get) {
            return (<FontAwesomeIcon icon={faEnvelopeOpen}/>)
        } else if (props.permissionType == PermissionType.Put) {
            return (<FontAwesomeIcon icon={faEdit}/>)
        } else if (props.permissionType == PermissionType.Delete) {
            return (<FontAwesomeIcon icon={faTrash}/>)
        } else {
            return (<> not define</>)
        }
    }

    if (isValidToPassAuth(props.permissionName!, props.permissionType!, contextType!)) {
            return (<>
                <OverlayTrigger
                    delay={{hide: 300, show: 200}}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            {props.label}
                        </Tooltip>
                    )}
                    placement="top">
                    <button
                        onClick={props.onClick} className="item"
                        data-value={props.id}
                        data-index={props.index}>
                        {
                            onItemAction()
                        }

                    </button>
                </OverlayTrigger>
            </>)
        } else {
            return (<> </>);
        }

}

export default AuthCommonComponent;

