import React from "react";
import styles from "./FloatingActionButton.module.css";

const FloatingActionButton = ({ onClick}) => {
    return <div 
                className={styles["floating-action-button"]}
                onClick={onClick}>
                <img src="/images/plus_white.png" />
            </div>;
};

export default FloatingActionButton;