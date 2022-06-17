import React, { useEffect } from "react";
import styles from './styles.module.css';


export default function Login(props) {

    useEffect(()=>{
        document.getElementsByTagName('body')[0].classList.add('no-extra');
    },[]);

    return (
    <div>
        <img src="/assets/img/bg.jpg" alt="background"/>
        <div className={styles.externalSection}>
            <h3 className={styles.title}>Login</h3>
            <hr />
            <div className={styles.inputsContainer}>
                <input type="email" placeholder="Enter your email here:" />
                <input type="password"  placeholder="Enter your password here:"/>
                <div className={styles.flexSpaceBetween}>
                    <div>
                        <input type="checkbox" id="checkbox-remember" /><label fro="checkbox-remember">Remember me</label>
                    </div>
                    <a href="#">Forget Password</a>
                </div>
            </div>
            <button>Login</button>
            <hr />
            <div className={styles.flexSpaceBetween}>
                <p>
                    Thank you and enjoy our website.<br/>
                    <strong>Your Authentication Team</strong>
                </p>
                <img className={styles.smallLogo} src="https://technext.github.io/guruable/assets/images/auth/Logo-small-bottom.png" />
            </div>
        </div>
    </div>
    )
}