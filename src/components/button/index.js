import React from "react";
import styles from './styles.module.css';
import Icon from "../icon";

export default function Button (props) {


    const primary = " " + styles.primary;
    const success = " " + styles.success;
    const warning = " " + styles.warning;
    const error   = " " + styles.error;  

    const style = {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: props.label ? 15 : 0,
        display: "flex",
        justifyContent: props.label ? "left" : "center",
        alignItems: "center"
    }

    const getBtnType = () => {
        switch(props.type) {
            case "primary":
                return " " + primary;
            case "success":
                return " " + success;
            case "warning":
                return " " + warning;
            case "error":
                return " " + error;
        }
    }

    return (
        <button onClick={props.onClick} className={styles.mainStyle+getBtnType()} style={props.style}>
            <Icon style={style} icon={props.icon}/>
            {props.label}
        </button>
    )
}

