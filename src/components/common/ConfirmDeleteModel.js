import React, { useState } from "react";
import styles from "../../css/common/ConfirmDeleteModel.module.css"

const ConfirmDeleteModel = ({ isOpen, onClose, onCancel, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles["delete-modal-overlay"]} onClick={onClose}>
            <div className={styles["delete-modal-content"]} onClick={(e) => e.stopPropagation()}>
                <p className={styles["delete-model-text"]}>정말로 삭제할까요?</p>
                <div className={styles["delete-model-actions"]}>
                    <hr />
                    <button className={styles["cancel-btn"]} onClick={onCancel}>아니요</button>
                    <button className={styles["confirm-btn"]} onClick={onConfirm}>네</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModel;