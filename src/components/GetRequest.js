import { useState, useEffect } from "react";

const GetRequest = (url, updateComponent='') => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error("Could not fetch data");
            }
            return res.json();
        })
        .then(data => {
            // console.log(data);
            setData(data);
        })
        .catch(err => {
            console.log(err.message);
        })
    }, [updateComponent])

    return data
}
 
export default GetRequest;