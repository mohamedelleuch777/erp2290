import React, { Fragment, useState } from "react";
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
                <Item label="Dashboard" icon="home" color="#4680ff" path="/" />
                <Item label="Clients" icon="users" color="#FC6180" path="/login" />
                <Item label="Stock" icon="bar-chart" color="#93BE52" path="/" />
                <Item label="Users" icon="user" color="#FFB64D" path="/" />
                <Item label="Help" icon="question" color="#ff4646" path="/" />
            </ul>
        </section>
    </div>
    )
}

const Item = (props) => {

    const [path,] = useState(props.path)

    const redirect = () => {
        window.location.href = path;
    }

    return (
        <li className={styles.item} onClick={redirect}>
            <div className={styles.iconContainer} style={{backgroundColor:props.color}}>
                <i className={"fa fa-"+props.icon} aria-hidden="true"></i>
            </div>
            <h3>{props.label}</h3>
        </li>
    )
}