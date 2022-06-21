import React, {useEffect, useState} from "react";
import Loading from "../components/loading";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import useFullscreen from "../Hooks/fullscreen";



export default function Dashboard(props) {
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
                    <button>click me</button>
                    <i className="fa fa-id-card" aria-hidden="true"></i>
                </main>
            </div>
        }
    </div>
}