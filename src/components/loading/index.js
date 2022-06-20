import React from "react";
import styles from './styles.module.css';


export default function Loading (props) {

    return (
        <div className={styles.ballScale}>
            <div className={styles.contain}>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
                <div className={styles.ring}>
                    <div className={styles.frame}></div>
                </div>
            </div>
        </div>
    )
}