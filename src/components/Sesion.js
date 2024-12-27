import React from "react";
import styles from "./sesion.module.css";

const Sesion = () => {
    return(
        <div className={styles["container"]}>
            <div>
            <   button>피드</button>
            </div>
            <div>
            <   button>모임</button>
            </div>
            <div>
                <button>채팅</button>
            </div>
        </div>
    );
}

export default Sesion;