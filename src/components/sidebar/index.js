import React from "react";
import styles from './styles.module.css';

export default function Sidebar(props) {
    return (
    <div className={styles.sideBarContainer}>
        <section className={styles.profileContainer}>
            <img className={styles.profilePicture} alt="profile-avatar" src="/assets/img/avatar.jpg" />
            <div>
                <h3 className={styles.profileName}>Mohamed Elleuch</h3>
                <div className={styles.textContainer} >
                    <span className={styles.profileAccountType} >Administrator</span>
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                </div>
            </div>
        </section>
    </div>
    )
}