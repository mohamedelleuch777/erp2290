import React, {useEffect, useState} from "react";
import Card from "../components/card";
import Loading from "../components/loading";
import Sidebar from "../components/sidebar";
import Table from "../components/table";
import Topbar from "../components/topbar";
import useFullscreen from "../Hooks/fullscreen";


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


export default function Client(props) {
    const [isLoading, setisLoading] = useState(true);
    //const {fscreen, setFScreen} = useFullscreen(false)

    useEffect(()=>{
        setTimeout(() => {
            setisLoading(false);
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
                    <Table data={data} />
                </main>
            </div>
        }
    </div>
}