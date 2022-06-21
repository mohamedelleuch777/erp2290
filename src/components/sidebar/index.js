import React from "react";
import styles from './styles.module.css';

export default function Sidebar(props) {
    return (
    <div className={styles.sideBarContainer}>
        <section>
            <img className={styles.profilePicture} alt="profile-avatar" src="/assets/img/avatar.jpg" />
            <div>
                <h3 className={styles.profileName}>Mohamed Elleuch</h3>
                <i className="fa fa-angle-down" aria-hidden="true"></i>
            </div>
        </section>
    </div>
    )
}