import React, {useEffect, useState} from "react";
import styles from './styles.module.css';
import Card from "../../components/card";
import Loading from "../../components/loading";
import Sidebar from "../../components/sidebar";
import Table from "../../components/table";
import Topbar from "../../components/topbar";
import useForceUpdate from "../../Hooks/forceUpdate";

import Swal from 'sweetalert2'
import { Form } from "react-bootstrap";

export default function Client(props) {
    // const forceUpdate = useForceUpdate();
    const [isLoading, setisLoading] = useState(true);
    const [tableLoading, settableLoading] = useState(true);
    const [limit, setlimit] = useState(localStorage.getItem("limit") || 10);
    const [offset, setoffset] = useState(localStorage.getItem("offset") || 0);
    const [totalCount, settotalCount] = useState(localStorage.getItem("totalCount") || -1);
    const [selectedLine, setselectedLine] = useState(localStorage.getItem("selectedLine").split('\t') || []);
    const [data, setdata] = useState({
        header: [],
        body: []
    });
    //const {fscreen, setFScreen} = useFullscreen(false)

    const getData = async () => {
        // http://erp2290.xilyor.com/API/clients_mgr.php?limit=5&offset=2
        settableLoading(true);
        let res = null;
        try {
            let response = await fetch(`http://erp2290.xilyor.com//API/clients_mgr.php?limit=${limit}&offset=${offset}`, {
                method: "GET",
            });
            res = await response.json();
        } catch(e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }
        setdata(res);
        localStorage.setItem("totalCount",res.totalCount);
        setTimeout(() => {
            settableLoading(false);
        }, 100);
    }

    useEffect(() => {
        getData();
    },[limit,offset,totalCount]);

    useEffect(() => {
        console.table(selectedLine);
    },[selectedLine]);

    const HandleStorageEvent = () => {
        window.onstorage = () => {
            // When local storage changes, dump the list to
            // the console.
            setlimit(localStorage.getItem("limit") || 10);
            setoffset(localStorage.getItem("offset") || 10);
            settotalCount(localStorage.getItem("totalCount") || -1);
            setselectedLine(localStorage.getItem("selectedLine").split('\t') || []);
        };
    }

    useEffect(()=>{
        HandleStorageEvent();
        getData();
        setTimeout(()=>{
            setisLoading(false);
        },1000);
    },[]);

    return <div>
        {isLoading && <Loading />}
        {isLoading ||
            <div>
                <Topbar />
                <Sidebar />
                <main>
                    <Card title="Clients Management" text="From this table you can manage the list of client:" />
                    <Table data={data} loading={tableLoading} offset={setoffset} limit={setlimit}  />
                    <Card title="Client Details:" text="Here the details of the selected client are show one by one:" />
                    <Form>
                        {
                            data.header && data.header.map( (e, i) =>
                                <div className={styles.detailContainer} key={i}>
                                    <label>{e}</label>
                                    <input readOnly className="form-control" value={selectedLine[i+1]} />
                                </div>
                            )
                        }
                    </Form>
                </main>
            </div>
        }
    </div>
}