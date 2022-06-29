import React, {useEffect, useState} from "react";
import Card from "../../components/card";
import Loading from "../../components/loading";
import Sidebar from "../../components/sidebar";
import Table from "../../components/table";
import Topbar from "../../components/topbar";
import useFullscreen from "../../Hooks/fullscreen";
;


export default function Client(props) {
    const [isLoading, setisLoading] = useState(true);
    const [tableLoading, settableLoading] = useState(true);
    const [data, setdata] = useState({
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
    });
    //const {fscreen, setFScreen} = useFullscreen(false)

    const getData = async () => {
        let response = await fetch("http://erp2290.xilyor.com//API/clients_mgr.php", {
            method: "GET",
        });
        let res = await response.json();
        console.log(res);
        setdata(res);
        settableLoading(false);
    }

    useEffect(()=>{
        setTimeout(() => {
            setisLoading(false);
            getData();
        }, 2500);
    },[]);

    return <div>
        {isLoading && <Loading />}
        {isLoading ||
            <div>
                <Topbar />
                <Sidebar />
                <main>
                    <Card title="Client Management" text="lorem spam a introduire la lubrification de la société" />
                    <Table data={data} loading={tableLoading} />
                </main>
            </div>
        }
    </div>
}