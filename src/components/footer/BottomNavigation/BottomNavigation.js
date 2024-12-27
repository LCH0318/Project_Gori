import React, { useState } from "react";
import styles from "./BottomNavigation.module.css";
import NavItem from "./NavItem";
import FloatingActionButton from "./FloatingActionButton";
import { FaPlus } from "react-icons/fa";

const BottomNavigation = () => {
    const [activeTab, setActiveTab] = useState("home");

    return (
        <div className={styles["bottom-navigation"]}>
            <div className={styles["nav-item"]}
                onClick={() => setActiveTab("home")}>
                <NavItem
                    active={activeTab === "home"}
                    label="홈"
                    activeIcon="/images/home_on.png"
                    inactiveIcon="/images/home_off.png"
                />
            </div>
            <div className={styles["floating-action-container"]}>
                <FloatingActionButton
                    icon={<FaPlus/>}
                    onClick={() => alert("만들기 클릭")} />
            </div>
            <div className={styles["nav-item"]}
                onClick={() => setActiveTab("mypage")}>
                <NavItem
                    active={activeTab === "mypage"}
                    label="내 활동"
                    activeIcon="/images/mypage_on.png"
                    inactiveIcon="/images/mypage_off.png"
                />
            </div>
        </div>
    );
};

export default BottomNavigation;