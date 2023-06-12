import React, { useEffect, useState } from "react";
import styles from './styles.module.css';


export default function Topbar (props) {

    const [notification] = useState(props.notification);
    const [menuVisible, setMenuVisible] = useState(false);

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

    const toggleMenu = () => {
        setTimeout(()=>{
            setMenuVisible(true);
        },150);
    }

    useEffect(()=>{
        document.addEventListener("click", ()=>{
            setMenuVisible(false);
        })
    },[]);

    return (
        <nav className={styles.navBar} >
            <section className={styles.blackSection}>
                <img alt="logo" className={styles.smallLogo} src="/assets/img/logo.png" />
                <span className={styles.round}><i className="fa fa-bars" aria-hidden="true"></i></span>
            </section>
            <section className={styles.whiteSection}>
                <div className={styles.leftItem}>
                    <i onClick={processFullscreen} className="fa fa-arrows-alt" aria-hidden="true"></i>
                </div>
                <div className={styles.rightItem}>
                    {notification && <span className={styles.redDot} />}
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                    <div className={styles.profileDiv}>
                        <img className={styles.profilePicture} alt="profile-avatar" src="/assets/img/avatar.jpg" />
                        <h3 className={styles.profileName}>Mohamed Elleuch</h3>
                        <i onClick={toggleMenu} className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                </div>
            </section>
            {<FloatingMenu visibility={menuVisible} />}
        </nav>
    )
}



const FloatingMenu = (props) => {

    if(props.visibility) {

        const handleMenu = (id) => {
            console.error(id)
        }


        return (
            <ul className={styles.floatingExBox}>
                <li onClick={()=>handleMenu(1)} className={styles.floatingBoxItem}><i className="fa fa-cog" aria-hidden="true"></i>Settings</li>
                <li onClick={()=>handleMenu(2)} className={styles.floatingBoxItem}><i className="fa fa-user-md" aria-hidden="true"></i>Profile</li>
                <li onClick={()=>handleMenu(3)} className={styles.floatingBoxItem}><i className="fa fa-envelope-o" aria-hidden="true"></i>Messages</li>
                <li onClick={()=>handleMenu(4)} className={styles.floatingBoxItem}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</li>
            </ul>
        )
    } else {
        return <></>
    }
}