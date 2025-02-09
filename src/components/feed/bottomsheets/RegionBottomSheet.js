import React, { useState, useRef } from "react";
import styles from "../../../css/feeds/bottomsheets/RegionBottomSheet.module.css";

const RegionBottomSheet = ({ isOpen, title, items, onSelect, onClose, selectedItem, onConfirm }) => {
    const sheetRef = useRef();

    const handleOutsideClick = (e) => {
        console.log(e.target.value)
        if (sheetRef.current && !sheetRef.current.contains(e.target)) {
            onClose();
        }

    }

    if (!isOpen) return null;

    return (
        <div className={styles["bottom-sheet-overlay"]} onClick={handleOutsideClick}>
            <div className={styles["bottom-sheet"]} ref={sheetRef}>
                <div className={styles["over"]}></div>
                <div className={styles["sheet-header"]}>
                    <img
                        className={styles["sheet-icon"]}
                        src="/images/map.png" />
                    <h3>{title}</h3>
                </div>
                <div className={styles["sheet-content"]}>
                    {items.map((item, index) => (
                        <button
                            key={"region" + index}
                            className={`${styles["location-button"]} ${selectedItem === item ? styles["selected"] : ""}`}
                            onClick={() => onSelect(item)}
                        >{item}</button>
                    ))}
                </div>
                {selectedItem && (
                    <button className={styles["confirm-button"]} onClick={onConfirm}>
                        선택 완료
                    </button>
                )}
            </div>
        </div>
    );
};

export default RegionBottomSheet;