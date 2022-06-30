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

    const changeLimit = () => {
        localStorage.setItem("limit", refCombo.current.value);
        window.dispatchEvent( new Event('storage') )
    }

    const firstPage = () => {
        localStorage.setItem("offset", 0);
        window.dispatchEvent( new Event('storage') )
    }

    const previousPage = () => {
        let currentOffset = localStorage.getItem('offset');
        let currentLimit = localStorage.getItem('limit');
        let newOffset = parseInt(currentOffset)-parseInt(currentLimit);
        localStorage.setItem("offset", newOffset>0?newOffset:0);
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
        window.dispatchEvent( new Event('storage') )
    }

    const lastPage = () => {
        localStorage.setItem("offset", -1);
        window.dispatchEvent( new Event('storage') )
    }

    useEffect(() => {
        setisLoading(props.loading);
        forceUpdate();
    },[props.loading]);

    return (
        <>
            {isLoading && <Loading />}
            {isLoading || 
                <>
                    <div className={styles.tableContainer}>
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
                                        <tr>
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
                    </div>
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
    color: "#999"
}

const btn2Style = {
    border: "1px solid #ccc",
    borderRadius: 5,
    top: -7,
    marginLeft: 5
}