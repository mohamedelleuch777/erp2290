import React, { useState } from "react";
import styles from './styles.module.css';
import { Form as FormBootstrap } from 'react-bootstrap';

export default function Form (props) {


    if(props.visibility) {
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