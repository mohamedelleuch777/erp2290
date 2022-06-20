import React from "react";
import styles from './styles.module.css';


export default function Button (props) {

    return (
        <button onClick={props.onClick} className={styles.mainStyle}>{props.label}</button>
    )
}