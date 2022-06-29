import React from "react";
import styles from './styles.module.css';
import Icon from "../icon";

export default function Button (props) {

    return (
        <button onClick={props.onClick} className={styles.mainStyle} style={props.style}>
            <Icon style={style} icon={props.icon}/>
            {props.label}
        </button>
    )
}



const style = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}