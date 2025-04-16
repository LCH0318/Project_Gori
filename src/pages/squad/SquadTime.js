import React, { useState } from "react";
import styles from "../../css/squad/SquadTime.module.css";

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = ["00", "30"];

const SquadTime = ({ isOpen, onClose, onSelect }) => {

    const [meridiem, setMeridiem] = useState(null);
    const [hour, setHour] = useState(null);
    const [minute, setMinute] = useState(null);
    const [isIndeterminate, setIsIndeterminate] = useState(false);

    const handleConfirm = () => {
        if (isIndeterminate) onSelect(null, null, null, true);
        else onSelect(hour, minute, meridiem, false);
        onClose();
    };

    const handleIsIndeterminate = (status) => {
        setIsIndeterminate(status);
        if (status) {
            setMeridiem(null);
            setHour(null);
            setMinute(null);
        }
    };

    // const handleMeridiem = (val) => {
    //     setIsIndeterminate(false);
    //     setMeridiem(val);
    // };

    // const handleHour = (val) => {
    //     setIsIndeterminate(false);
    //     setHour(val);
    // };

    // const handleMinute = (val) => {
    //     setIsIndeterminate(false);
    //     setMinute(val);
    // };

    if (!isOpen) return null;

    return (
        <div className={styles["modal-overlay"]} onClick={onClose}>
            <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles["modal-title"]}>
                    <img src="/images/alram.png" /><span>몇 시에 모일까요?</span>
                </h3>
                <div className={styles["picker-row"]}>
                    <div className={styles["picker-col"]}>
                        {["오전", "오후"].map((val, idx) => (
                            <div
                                key={`meridium_${idx}`}
                                className={`${styles['scroll-item']} ${meridiem === val ? styles["selected"] : ""}`}
                                onClick={() => !isIndeterminate && setMeridiem(val)}
                            >
                                {val}
                            </div>
                        ))}
                    </div>
                    <div className={styles["picker-col"]}>
                        <div className={styles["scroll-list"]}>
                            {hours.map((h) => (
                                <div
                                    key={`hour_${h}`}
                                    className={`${styles["scroll-item"]} ${h === hour ? styles["selected"] : ""}`}
                                    onClick={() => !isIndeterminate && setHour(h)}
                                >{h}</div>
                            ))}
                        </div>
                    </div>
                    <span className={styles["colon"]}>:</span>
                    <div className={styles["picker-col"]}>
                        <div className={styles["scroll-list"]}>
                            {minutes.map((m) => (
                                <div
                                    key={`minute_${m}`}
                                    className={`${styles["scroll-item"]} ${m === minute ? styles["selected"] : ""}`}
                                    onClick={() => !isIndeterminate && setMinute(m)}
                                >{m}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <label className={styles["checkbox-container"]}>
                    <input
                        type="checkbox"
                        checked={isIndeterminate}
                        onChange={() => handleIsIndeterminate(!isIndeterminate)}
                    /><span className={styles['custom-checkbox']}></span>미정
                </label>
                <button className={styles["confirm-btn"]}
                    onClick={handleConfirm}
                >선택 완료</button>
            </div>
        </div>
    );
}

export default SquadTime;