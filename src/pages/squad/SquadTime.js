import React, { useState } from "react";
import styles from "../../css/squad/SquadTime.module.css";

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = ["00", "30"];

const SquadTime = ({ isOpen, onClose, onSelect }) => {

    const [meridiem, setMeridiem] = useState("오전");
    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(0);
    const [isIndeterminate, setIsIndeterminate] = useState(false);

    const handleConfirm = () => {
        if (isIndeterminate) onSelect(null, null, null, true);
        onSelect(meridiem, hour, minute, false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles["sheet-container"]}>
            <div className={styles["sheet-handle"]}>
                <div className={styles["sheet-header"]}>
                    <img src="/images/alram.png" /><span>몇 시에 모일까요?</span>
                </div>
                <div className={styles["time-picker"]}>
                    <div className={styles["meridiem"]}>
                        <span>오전</span>
                        <span>오후</span>
                    </div>
                    <div className={styles["time-scroll-container"]}>
                        <div className={styles["time-scroll"]}>
                            {hours.map((h) => (
                                <div
                                    key={`hour_${h}`}
                                    className={`${styles["time-item"]} ${h === hour ? styles["selected"] : ""}`}
                                    onChange={() => setHour(h)}
                                >{h}</div>
                            ))}
                        </div>
                        <span className={styles["colon"]}>:</span>
                        <div className={styles["time-scroll"]}>
                            {minutes.map((m) => (
                                <div
                                    key={`minute_${m}`}
                                    className={`${styles["time-item"]} ${m === minute ? styles["selected"] : ""}`}
                                    onClick={() => setMinute(m)}
                                >{m}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <label className={styles["checkbox-container"]}>
                    <input
                        type="checkbox"
                        checked={isIndeterminate}
                        onChange={() => setIsIndeterminate(!isIndeterminate)}
                    /><span>미정</span>
                </label>
                <button className={styles["confirm-btn"]}
                    onClick={onClose}
                >선택 완료</button>
            </div>
        </div>
    );
}

export default SquadTime;