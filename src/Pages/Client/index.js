import React, {useEffect, useState} from "react";
import Card from "../../components/card";
import Loading from "../../components/loading";
import Sidebar from "../../components/sidebar";
import Table from "../../components/table";
import Topbar from "../../components/topbar";
import useForceUpdate from "../../Hooks/forceUpdate";

export default function Client(props) {
    // const forceUpdate = useForceUpdate();
    const [isLoading, setisLoading] = useState(true);
    const [tableLoading, settableLoading] = useState(true);
    const [limit, setlimit] = useState(localStorage.getItem("limit") || 10);
    const [offset, setoffset] = useState(localStorage.getItem("offset") || 0);
    const [data, setdata] = useState({
        header: [],
        body: []
    });
    //const {fscreen, setFScreen} = useFullscreen(false)

    const getData = async () => {
        // http://erp2290.xilyor.com/API/clients_mgr.php?limit=5&offset=2
        settableLoading(true);
        let response = await fetch(`http://erp2290.xilyor.com//API/clients_mgr.php?limit=${limit}&offset=${offset}`, {
            method: "GET",
        });
        let res = await response.json();
        setdata(res);
        setTimeout(() => {
            settableLoading(false);
        }, 10);
    }

    useEffect(() => {
        getData();
    },[limit]);

    const HandleStorageEvent = () => {
        window.onstorage = () => {
            // When local storage changes, dump the list to
            // the console.
            setlimit(localStorage.getItem("limit") || 10);
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
                    <Card title="Client Management" text="From this table you can manage the list of client:" />
                    <Table data={data} loading={tableLoading} offset={setoffset} limit={setlimit}  />
                </main>
            </div>
        }
    </div>
}