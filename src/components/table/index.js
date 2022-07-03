import React, { useEffect, useState, useRef } from "react";
import styles from './styles.module.css';
import TableBootstrap from 'react-bootstrap/Table'
import Loading from "../loading";
import Combobox from "../combobox";
import Button from "../button";
import useForceUpdate from "../../Hooks/forceUpdate";




const options = [1,2,3,5,10,20,50,100,250,500]

export default function Table (props) {
    
    const forceUpdate = useForceUpdate();
    const [isLoading, setisLoading] = useState(props.loading);
    const [refCombo, setrefCombo] = useState(null);
    const [tableDisabled, settableDisabled] = useState(localStorage.tableDisabled=="true"?true:false || false);

    const refTable = useRef();

    const changeLimit = () => {
        localStorage.setItem("limit", refCombo.current.value);
        localStorage.setItem("selectedLine",'');
        window.dispatchEvent( new Event('storage') )
    }

    const firstPage = () => {
        localStorage.setItem("offset", 0);
        localStorage.setItem("selectedLine",'');
        window.dispatchEvent( new Event('storage') )
    }

    const previousPage = () => {
        let currentOffset = localStorage.getItem('offset');
        let currentLimit = localStorage.getItem('limit');
        let newOffset = parseInt(currentOffset)-parseInt(currentLimit);
        localStorage.setItem("offset", newOffset>0?newOffset:0);
        localStorage.setItem("selectedLine",'');
        window.dispatchEvent( new Event('storage') )
    }

    const nextPage = () => {

        let currentOffset = parseInt(localStorage.getItem('offset'));
        let currentLimit = parseInt(localStorage.getItem('limit'));
        let totalCount = parseInt(localStorage.getItem('totalCount'));
        localStorage.setItem("offset", parseInt(currentOffset)+parseInt(currentLimit));
        if(totalCount!=undefined && (totalCount<=-1 || currentOffset>=totalCount)) {
            localStorage.setItem("offset", 0);
        }
        localStorage.setItem("selectedLine",'');
        window.dispatchEvent( new Event('storage') )
    }

    const lastPage = () => {
        localStorage.setItem("offset", -1);
        localStorage.setItem("selectedLine",'');
        window.dispatchEvent( new Event('storage') )
    }

    const selectTableLine = (e) => {
        localStorage.setItem("selectedLine", e.target.parentElement.innerText);
        window.dispatchEvent( new Event('storage') )
    }

    useEffect(() => {
        setisLoading(props.loading);
        forceUpdate();
    },[props.loading]);

    const HandleStorageEvent = () => {
        window.addEventListener("storage", () => {
            console.log("ff");
            settableDisabled(localStorage.tableDisabled=="true"?true:false || false);
            if(localStorage.tableDisabled=="true") {
                refTable.current.scroll(0,0);
                refTable.current.style.overflow = "hidden";
            } else {
                refTable.current.style.overflow = "auto";
            }

        })        
    }

    useEffect(()=>{
        HandleStorageEvent();
    },[]);

    return (
        <>
            {isLoading && <Loading />}
            {isLoading || 
                <>
                    <div ref={refTable} className={styles.tableContainer}>
                        <TableBootstrap striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {props.data && props.data.header.map((e,i)=>{
                                        return(
                                            <th key={i}>{e}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {props.data && props.data.body.map((e,i)=>{
                                    return(
                                        <tr onClick={selectTableLine}>
                                            <th scope="row">{i+1}</th>
                                            {e.map((e,i)=>{
                                                return(
                                                    <td key={i}>{e}</td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </TableBootstrap>
                        <div  className={styles.buttonsContainer}>
                            <div>
                                <Combobox setRef={setrefCombo} options={options} icon="file-text-o" onChange={changeLimit} />
                                <Button icon="search" style={{...btnStyle,...btn2Style}} />
                            </div>
                            <div>
                                <Button icon="backward" style={btnStyle} onClick={firstPage} />
                                <Button icon="caret-left" style={btnStyle} onClick={previousPage} />
                                <Button icon="caret-right" style={btnStyle} onClick={nextPage} />
                                <Button icon="forward" style={btnStyle} onClick={lastPage} />
                            </div>
                        </div>
                        {tableDisabled &&<div className={styles.tableOverLap}></div>}
                    </div>
                    
                </>
            }
        </>
    )
}

const btnStyle = {
    margin: 0,
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    border: "none",
    color: "#999",
    marginLeft: 5
}

const btn2Style = {
    border: "1px solid #ccc",
    borderRadius: 5,
    top: -7,
    marginLeft: 5
}