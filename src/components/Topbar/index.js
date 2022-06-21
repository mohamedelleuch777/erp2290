import React from "react";
import styles from './styles.module.css';


export default function Topbar (props) {

    return (
        <nav className={styles.navBar} >
            <section className={styles.blackSection}>
                black section
            </section>
            <section className={styles.whiteSection}>
                <div className={styles.leftItem}>

                </div>
                <div className={styles.rightItem}>
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                    <div className={styles.profileDiv}>
                        <img className={styles.profilePicture} alt="profile-avatar" src="/assets/img/avatar.jpg" />
                        <h3 className={styles.profileName}>Mohamed Elleuch</h3>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                </div>
            </section>
        </nav>
    )
}