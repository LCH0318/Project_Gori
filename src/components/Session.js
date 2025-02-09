import React,{useState} from "react";
import styles from "./session.module.css";
import { Navigate } from "react-router-dom";

const Session = () => {
    const [activeTab, setActiveTab] = useState(false); 

    const handleClick = (index) => {
        setActiveTab(index)
        // console.log(index)
    }

    return(
        <div className={styles["container"]}>
            <div onClick={()=>{handleClick(1)}}
                        className={activeTab===1 ? styles["active"] : ""}>
                <button>피드</button>
            </div>
            <div onClick={()=>{handleClick(2)}}
                        className={activeTab===2 ? styles["active"] : ""}>
                <button>모임</button>
            </div>
            <div onClick={()=>{handleClick(3)}}
                        className={activeTab===3 ? styles["active"] : ""}>
                <button>채팅</button>
            </div>
        </div>
    );
}

export default Session;