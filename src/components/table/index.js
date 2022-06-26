import React from "react";
//import styles from './styles.module.css';
import Table_ from 'react-bootstrap/Table'


const data = {
    header: [
        "First Name:",
        "Last Name:",
        "User Name:"
    ],
    body: [
        ["Mark", "Otto", "@mdo"],
        ["Jacob", "Thornton", "@fat"],
        ["Larry", "the Bird", "@twitter"],
    ]
};

export default function Table (props) {

    return (
        <Table_ striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    {data.header.map((e,i)=>{
                        return(
                            <th key={i}>{e}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {data.body.map((e,i)=>{
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