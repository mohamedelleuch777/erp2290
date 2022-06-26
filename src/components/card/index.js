import React from "react";
import styles from './styles.module.css';


const data = {
    header: [
        "First Name:",
        "Last Name:",
        "User Name:"
    ],
    body: [
        ["Mark", "Otto", "@mdo"],
        ["Jacob", "Thornton", "@fat"],
        ["Larry", "the Bird", "@twitter"],
    ]
};

export default function Card (props) {

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h5>{props.title}</h5>
                <span>{props.text}</span>
                <div className={styles.cardHeaderRight}>    <ul className={styles.listUnstyled+" "+ styles.cardOption}>        <li><i className={styles.icoFont+" "+ styles.icoFontSampleLeft }></i></li>        <li><i className={styles.icoFont+" "+ styles.icoFontMaximize +" "+ styles.fullCard}></i></li>        </ul></div>
            </div>
        </div>
    )
}