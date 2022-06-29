import React, { useEffect, useState } from "react";
//import styles from './styles.module.css';
import TableBootstrap from 'react-bootstrap/Table'
import Loading from "../loading";




export default function Table (props) {

    const [isLoading, setisLoading] = useState(props.loading);

    useEffect(() => {
        setisLoading(props.loading);
    },[props.loading]);

    return (
        <>
            {isLoading && <Loading />}
            {isLoading || <TableBootstrap striped bordered hover size="sm">
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
            </TableBootstrap>}
        </>
    )
}