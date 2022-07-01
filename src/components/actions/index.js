import React, { useState } from "react";
import Button from "../button";
import styles from './styles.module.css';

export default function Actions (props) {


    const data = localStorage.getItem('selectedLine').split('\t');
    if(props.visibility && data.length>1) {
        // console.table();
        return (
            <section style={section}>
                <Button type="primary" label="Edit" icon="user" />
                <Button type="success" label="Add" icon="user" />
                <Button type="warning" label="Add" icon="user" />
                <Button type="error" label="Add" icon="user" />
            </section>
        )
    }
}

const section = {
    display: "flex"
}