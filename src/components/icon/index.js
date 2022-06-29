import React from "react";
import styles from './styles.module.css';


export default function Icon (props) {

    return (
        <i style={props.style} className={"fa fa-"+props.icon} aria-hidden="true"></i>
    )
}