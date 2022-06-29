import React, { useEffect, useRef } from "react";
import Icon from "../icon";
import styles from './styles.module.css';


export default function Combobox (props) {
    const ref1 = React.useRef(props.ref)
    const ref2 = React.useRef(null)

    const mergeRefs = (...refs) => {
        return node => {
            for (const ref of refs) {
            ref.current = node
            }
        }
    }

    const handleChange = () => {
        props.onChange && props.onChange();
    }

    useEffect( () => {
        props.setRef && props.setRef(ref1);
        ref2.current.value = localStorage.getItem("limit") || 10;
    });


    return (
        <>
            <Icon style={style} icon={props.icon}/>
            <select ref={mergeRefs(ref1, ref2)} className={styles.mainStyle} onChange={handleChange}>
            {/* <select ref={props.ref} className={styles.mainStyle} onChange={handleChange}> */}
                {props.options && props.options.map( (e,i) => {
                    return <option key={i} value={e}>{e}</option>
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