import { useEffect } from "react";

export default function useFullscreen (status) {


    function openFullscreen() {
        let elem = document.getElementsByTagName('html')[0];
        if (elem.requestFullscreen) {
        elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
        }
    }

    function closeFullscreen() {

    }

    useEffect( () => {
        if(status) {
            openFullscreen();
            return true;
        } else {
            closeFullscreen();
            return false;
        }
    },[]);
}