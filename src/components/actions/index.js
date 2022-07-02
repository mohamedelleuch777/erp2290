import React, { useEffect, useState } from "react";
import Button from "../button";
import styles from './styles.module.css';

import Swal from 'sweetalert2'
import FormManipulator from "../../Hooks/formManipulator";

export default function Actions (props) {
    const [workingMode, setworkingMode] = useState(localStorage.mode || "default");

    const addClient = () => {
        localStorage.setItem("tableDisabled", "true");
        localStorage.setItem("mode","add-cancel");
        localStorage.setItem("selectedLine","\t\t\t\t\t\t\t\t\t");
        window.dispatchEvent( new Event('storage') )
        localStorage.setItem("readOnly", false)
        window.dispatchEvent( new Event('storage') )
    }

    const editClient = () => {
        localStorage.setItem("tableDisabled", "true");
        // localStorage.setItem("readOnly", localStorage.getItem("readOnly")=="true"?false:true)
        localStorage.setItem("readOnly", false)
        localStorage.setItem("mode","save-cancel");
        window.dispatchEvent( new Event('storage') )
    }

    const cancelOperation = () => {
        localStorage.setItem("tableDisabled", "false");
        localStorage.setItem("readOnly", true)
        localStorage.setItem("mode","default");
        window.dispatchEvent( new Event('storage') )
    }

    const confirmEditClient = async () => {
        try {
            let response = await fetch(`http://erp2290.xilyor.com//API/edit_clients_mgr.php?ref=`, {
                method: "GET",
            });
            let res = await response.json();


            localStorage.setItem("readOnly", true)
            localStorage.setItem("mode","default");
            window.dispatchEvent( new Event('storage') )
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }

    const confirmAddClient = async () => {
        let params = FormManipulator();
        debugger
        
        try {
            let response = await fetch(`http://erp2290.xilyor.com//API/add_clients_mgr.php?values=${params}`, {
                method: "GET",
            });
            let res = await response.json();
            if(res["affected rows"]==1 && res["success"]==true) {
                localStorage.setItem("readOnly", true)
                localStorage.setItem("tableDisabled", false)
                localStorage.setItem("mode","default");
                window.dispatchEvent( new Event('storage') )
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Great! a new client has been added'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: 'Oops! Could\'t create a new client.'
                })
            }

            
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }

    const mode = () => {
        let _mode = localStorage.mode || "default";
        switch(_mode) {
            case "default":
                return  <section className={styles.sectionStyle}>
                            <Button type="success" label="Add" icon="plus-square-o" style={{margin:5}} onClick={addClient} />
                            <Button type="primary" label="Edit" icon="edit" style={{margin:5}} onClick={editClient} />
                            <Button type="warning" label="Add" icon="user" style={{margin:5}} />
                            <Button type="error" label="Add" icon="user" style={{margin:5}} />
                        </section>
            case "save-cancel":
                return  <section className={styles.sectionStyle}>
                            <Button type="success" label="Save" icon="save" style={{margin:5}} onClick={confirmEditClient} />
                            <Button type="error" label="Cancel" icon="ban" style={{margin:5}} onClick={cancelOperation} />
                        </section>
            case "add-cancel":
                return  <section className={styles.sectionStyle}>
                            <Button type="success" label="Add" icon="plus-square-o" style={{margin:5}} onClick={confirmAddClient} />
                            <Button type="error" label="Cancel" icon="ban" style={{margin:5}} onClick={cancelOperation} />
                        </section>
        }
    }

    useEffect(()=>{
        mode();
    },[workingMode]);

    const HandleStorageEvent = () => {
        window.addEventListener("storage", () => {
            setworkingMode(localStorage.mode || "default");
        })        
    }

    useEffect(()=>{
        HandleStorageEvent();
    },[]);

    // const data = localStorage.getItem('selectedLine').split('\t');
    if(props.visibility ) {
        // console.table();
        return mode();
    }
}

const section = {
    display: "flex"
}