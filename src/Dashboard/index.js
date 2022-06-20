import React, {useEffect, useState} from "react";
import Loading from "../components/loading";


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
                fewfwe
                <button>click me</button>
            </div>
        }
    </div>
}