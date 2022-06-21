import React, { useState } from "react";
import styles from './styles.module.css';


export default function Topbar (props) {

    const [notification] = useState(props.notification);
    const [menuVisible, setMenuVisible] = useState(true);

    function openFullscreen() {
        let elem = document.getElementsByTagName('html')[0];
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
          }
    }

    const processFullscreen = () => {
        if(document.fullscreen) {
            document.exitFullscreen();
        } else {
            openFullscreen();
        }
    }

    return (
        <nav className={styles.navBar} >
            <section className={styles.blackSection}>
                <img alt="logo" className={styles.smallLogo} src="/assets/img/logo.png" />
                <span className={styles.round}><i class="fa fa-bars" aria-hidden="true"></i></span>
            </section>
            <section className={styles.whiteSection}>
                <div className={styles.leftItem}>
                    <i onClick={processFullscreen} class="fa fa-arrows-alt" aria-hidden="true"></i>
                </div>
                <div className={styles.rightItem}>
                    {notification && <span className={styles.redDot} />}
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                    <div className={styles.profileDiv}>
                        <img className={styles.profilePicture} alt="profile-avatar" src="/assets/img/avatar.jpg" />
                        <h3 className={styles.profileName}>Mohamed Elleuch</h3>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                </div>
            </section>
            {<FloatingMenu visibility={menuVisible} />}
        </nav>
    )
}



const FloatingMenu = (props) => {

    return (
        <ul className={styles.floatingExBox}>
            <li className={styles.floatingBoxItem}><i class="fa fa-cog" aria-hidden="true"></i>Settings</li>
            <li className={styles.floatingBoxItem}><i class="fa fa-user-md" aria-hidden="true"></i>Profile</li>
            <li className={styles.floatingBoxItem}><i class="fa fa-envelope-o" aria-hidden="true"></i>Messages</li>
            <li className={styles.floatingBoxItem}><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</li>
        </ul>
    )
}