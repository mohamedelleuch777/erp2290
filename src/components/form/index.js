import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import { Form as FormBootstrap, InputGroup } from 'react-bootstrap';
import useForceUpdate from "../../Hooks/forceUpdate";

export default function Form (props) {
    let forceUpdate = useForceUpdate();
    const [data,] = useState(props.data);
    const [selectedLine, setselectedLine] = useState(props.selectedLine);
    // const [refresh, setrefresh] = useState(true);

    const handleUserInput = (e,u) => {
        if(!props.readOnly) {
            console.log("ghhghgh")
            let temp = selectedLine;
            if(e.nativeEvent.inputType == "insertText") {
                temp[u] = temp[u]+e.nativeEvent.data;
            }
            else if(e.nativeEvent.inputType == "deleteContentBackward") {
                temp[u] = temp[u].slice(0, -1);
            }
            setselectedLine(temp);
            forceUpdate();
        }
    }

    const HandleStorageEvent = () => {
        window.addEventListener("storage", () => {
            // setrefresh(false)
            localStorage.selectedLine && setselectedLine(localStorage.selectedLine.split('\t'));
            // setTimeout(() => {
            //     setrefresh(true)
            // }, 0);
        })
        
    }

    useEffect(()=>{
        HandleStorageEvent();
    },[]);


    const lineData = localStorage.getItem('selectedLine') ? localStorage.getItem('selectedLine').split('\t') : [];
    if(props.visibility && lineData.length>1) {
        // console.table();
        return (
            /*refresh &&*/ <FormBootstrap>
                {
                    data.header && data.header.map( (e, i) =>
                        <div className={styles.detailContainer} key={i}>
                            {/* {console.log(e,selectedLine[i+1])} */}
                            <label>{e}</label>
                            <input readOnly={false} className="form-control" value={selectedLine[i+1]} onChange={ e => handleUserInput(e,i+1)} />

                        </div>
                    )
                }
            </FormBootstrap>
        )
    }
    else {
        return <></>
    }
    
}