import React, { useState } from "react";
import Button from "../button";
import styles from './styles.module.css';

export default function Actions (props) {


    const data = localStorage.getItem('selectedLine').split('\t');
    if(props.visibility && data.length>1) {
        // console.table();
        return (
            <section className={styles.sectionStyle}>
                <Button type="primary" label="Edit" icon="user" style={{margin:5}} />
                <Button type="success" label="Add" icon="user" style={{margin:5}} />
                <Button type="warning" label="Add" icon="user" style={{margin:5}} />
                <Button type="error" label="Add" icon="user" style={{margin:5}} />
            </section>
        )
    }
}

const section = {
    display: "flex"
}