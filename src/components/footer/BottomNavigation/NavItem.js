import React from "react";
import styles from "./NavItem.module.css";

const NavItem = ({ active, label, activeIcon, inactiveIcon }) => {
    return (
        <div 
            className={`${styles["nav-item"]} 
                        ${active ? styles["active"] : ""}`}
        >
            <img 
                    src={active ? activeIcon : inactiveIcon}
                    className={styles["nav-icon"]}
            />
            <span>{label}</span>
        </div>
    );
};

export default NavItem;