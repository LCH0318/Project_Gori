import React, { useEffect, useState } from "react";
import styles from "../../css/chat/Chatting.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Chatting = () => {

    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const today = now.getDay();
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const hours = now.getHours();
        const minute = now.getMinutes();

        setCurrentDate(`${year}. ${month}. ${day}(${days[today]})`)

    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const { titleText, peopleCount } = location.state || {};

    const handleBack = ({ onBack }) => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    }

    const [expanded, setExpanded] = useState(false);
    const maxLength = 48;
    const text = "다음 파크 골프 일정 공유합니다! 4월 25일 월 25일 금요일 오후 8시에 신논현역에서 만나려고 하는데 가능하신분 계신가요?";
    const shouldTruncate = text.length > maxLength;
    const truncatedText = text.slice(0, maxLength) + "...";

    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                <img src="/images/headerImg.png" onClick={handleBack} />
                <h1>{titleText}</h1>
                <p>관리</p>
            </div>

            <div className={styles["chat"]}>
                <div className={styles["myChat"]}>
                    <div className={styles["notice"]}>
                        <p>
                            <span className={styles["noticeText"]}>공지</span>
                            {expanded || !shouldTruncate ? text : truncatedText}
                            {shouldTruncate && (
                                <button
                                    className={styles["toggle-text"]}
                                    onClick={() => setExpanded(!expanded)}
                                    src="../">
                                    {expanded ? <img src="../../images/noticeOpen.png" /> : <img src="../../images/noticeFold.png" />}
                                </button>
                            )}
                        </p>
                    </div>
                    <div className={styles["todayDate"]}><p>{currentDate}</p></div>
                </div>
            </div>

        </div>
    );
}
export default Chatting;
