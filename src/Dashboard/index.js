import React, {useEffect, useState} from "react";
import Loading from "../components/loading";
import Topbar from "../components/topbar";



export default function Dashboard(props) {
    const [isLoading, setisLoading] = useState(true);

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
                <button>click me</button>
                <i className="fa fa-id-card" aria-hidden="true"></i>
            </div>
        }
    </div>
}