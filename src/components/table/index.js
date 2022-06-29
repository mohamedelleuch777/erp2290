import React, { useEffect, useState, useRef } from "react";
import styles from './styles.module.css';
import TableBootstrap from 'react-bootstrap/Table'
import Loading from "../loading";
import Combobox from "../combobox";
import Button from "../button";



const options = [5,10,20,50,100,250,500]

export default function Table (props) {
    
    const [isLoading, setisLoading] = useState(props.loading);
    const [refCombo, setrefCombo] = useState(null);

    const changeLimit = () => {
        localStorage.setItem("limit", refCombo.current.value);
    }

    useEffect(() => {
        setisLoading(props.loading);
    },[props.loading]);

    return (
        <>
            {isLoading && <Loading />}
            {isLoading || <><TableBootstrap striped bordered hover size="sm">
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
                                <th scope="row">{i}</th>
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
                </div>
                <div>
                    <Button icon="backward" style={btnStyle} />
                    <Button icon="caret-left" style={btnStyle} />
                    <Button icon="caret-right" style={btnStyle} />
                    <Button icon="forward" style={btnStyle} />
                </div>
            </div>
            </>}
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