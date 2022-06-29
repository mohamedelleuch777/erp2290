import React from "react";
import Icon from "../icon";
import styles from './styles.module.css';


export default function Combobox (props) {

    return (
        <>
            <Icon style={style} icon={props.icon}/>
            <select className={styles.mainStyle}>
                {props.options && props.options.map( (e,i) => {
                    return <option key={i}>{e}</option>
                } )}
            </select>
        </>
    )
}

const style = {
    position: "absolute",
    width: 30,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}