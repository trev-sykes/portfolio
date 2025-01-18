import { useEffect } from "react";

export const useRemoveKinKins = () => {
    useEffect(() => {
        const intervalId = setInterval(() => {
            const kinsKins = document.querySelector('#kins-kins-popup');
            if (kinsKins) {
                kinsKins.remove();
                clearInterval(intervalId); // Clear interval if kinsKins is found and removed
            }
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);
}