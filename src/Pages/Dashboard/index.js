import React, {useEffect, useState} from "react";
import Loading from "../../components/loading";
import Sidebar from "../../components/sidebar";
import Table from "../../components/table";
import Topbar from "../../components/topbar";
import useFullscreen from "../../Hooks/fullscreen";


export default function Dashboard(props) {
    const [isLoading, setisLoading] = useState(true);
    const [tableLoading, settableLoading] = useState(true);
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
                    <Table Loading={tableLoading} />
                </main>
            </div>
        }
    </div>
}