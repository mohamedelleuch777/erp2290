import React, { useState } from "react";
import Button from "../button";
import styles from './styles.module.css';

export default function Actions (props) {

    const addClient = () => {
        localStorage.setItem("selectedLine","\t\t\t\t\t\t\t\t\t");
        window.dispatchEvent( new Event('storage') )
        localStorage.setItem("readOnly", false)
        window.dispatchEvent( new Event('storage') )
    }

    const editClient = () => {
        localStorage.setItem("readOnly", localStorage.getItem("readOnly")=="true"?false:true)
        window.dispatchEvent( new Event('storage') )
        console.log(localStorage.getItem("readOnly"));
    }

    // const data = localStorage.getItem('selectedLine').split('\t');
    if(props.visibility ) {
        // console.table();
        return (
            <section className={styles.sectionStyle}>
                <Button type="success" label="Add" icon="user" style={{margin:5}} onClick={addClient} />
                <Button type="primary" label="Edit" icon="user" style={{margin:5}} onClick={editClient} />
                <Button type="warning" label="Add" icon="user" style={{margin:5}} />
                <Button type="error" label="Add" icon="user" style={{margin:5}} />
            </section>
        )
    }
}

const section = {
    display: "flex"
}