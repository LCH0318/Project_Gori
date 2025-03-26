import React, { useRef, useState } from "react";
import styles from "./BottomNavigation.module.css";
import NavItem from "./NavItem";
import FloatingActionButton from "./FloatingActionButton";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomNavigation = () => {
    const [activeTab, setActiveTab] = useState("home");
    const bottomSheetRef = useRef(null);
    const navigate = useNavigate();

    const openBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.classList.add(styles["active"]);
        }
    }

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
                    icon={<FaPlus />}
                    onClick={() => openBottomSheet()} />
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
            <div className={styles["bottom-sheet"]} ref={bottomSheetRef}>
                <div className={styles["bottomSheet-handle"]}></div>
                <div className={styles["bottomSheet-content"]} onClick={() => navigate("/feed/new")}>
                    <img className={styles["bottomSheet-image"]} src="/images/calenderIcon.png" />일상
                    <div>관심있는 주제로 이야기봐요</div>
                </div>
                <div className={styles["bottomSheet-content"]}>
                    <img className={styles["bottomSheet-image"]} onClick={() => navigate('/squad/new')}
                        src="/images/userIcon.png" />모임
                    <div>관심있는 주제로 모여봐요</div>
                </div>
                <div className={styles["bottomSheet-content"]}><img className={styles["bottomSheet-image"]} src="/images/chatIcon.png" />채팅
                    <div>관심있는 주제로 대화해봐요</div>
                </div>
            </div>
        </div>
    );
};

export default BottomNavigation;