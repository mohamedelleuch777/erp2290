import React, { Fragment } from "react";
import styles from './styles.module.css';

export default function Sidebar(props) {


    const handleItemSelection = () => {
        console.log("item clicked");
    }


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
        <section className={styles.pages}>
            <h4>Pages:</h4>
            <ul className={styles.listUL}>
                <Item label="Dashboard" onClick={handleItemSelection} />
            </ul>
        </section>
    </div>
    )
}

const Item = (props) => {

    return (
        <li className={styles.item} onClick={props.onClick}>
            <div className={styles.iconContainer}>
                <i className="fa fa-home" aria-hidden="true"></i>
            </div>
            <h3>{props.label}</h3>
        </li>
    )
}