import React, { useState } from "react";
import styles from './styles.module.css';


export default function Checkbox (props) {

    const [checked, setChecked] = useState(false);

    const clicked = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        console.log("safd");
        setChecked(!checked);
    }

    return (
        <label onClick={clicked} className={styles.container} >{props.label}
            <input type="checkbox" checked={checked} />
            <span className={styles.checkmark}></span>
        </label>
    )
}