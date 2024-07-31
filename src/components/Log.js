import { useEffect, useRef, useState } from "react";

function Log(props){
    const log = useRef(null);
    useEffect(()=>{
        log.current.scrollIntoView({ behavior: "smooth", block: "end" });
    },[])
 
    return(
        <div ref={log} className="log">{props.logInformation}</div>
    )
}
  
export default Log;
  