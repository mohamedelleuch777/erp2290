import React from "react";
//import styles from './styles.module.css';
import Table_ from 'react-bootstrap/Table'



export default function Table (props) {

    return (
        <Table_ striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    {props.data.header.map((e,i)=>{
                        return(
                            <th key={i}>{e}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data.body.map((e,i)=>{
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
        </Table_>
    )
}