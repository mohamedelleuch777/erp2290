import React, { useState } from "react";
import styles from './styles.module.css';
import { Form as FormBootstrap } from 'react-bootstrap';

export default function Form (props) {


    const data = localStorage.getItem('selectedLine').split('\t');
    if(props.visibility && data.length>1) {
        // console.table();
        return (
            <FormBootstrap>
                {
                    props.data.header && props.data.header.map( (e, i) =>
                        <div className={styles.detailContainer} key={i}>
                            <label>{e}</label>
                            <input readOnly className="form-control" value={props.selectedLine[i+1]} />
                        </div>
                    )
                }
            </FormBootstrap>
        )
    }
}