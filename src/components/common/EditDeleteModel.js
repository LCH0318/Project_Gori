import React, { useState } from "react";
import styles from "../../css/common/EditDeleteModel.module.css"
import ConfirmDeleteModel from "./ConfirmDeleteModel";

const EditDeleteModel = ({ isOpen, onClose, onEdit, onDelete }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className={styles["model-overlay"]} onClick={onClose}>
            <div className={styles["model-content"]} onClick={(e) => e.stopPropagation()}>
                <button className={styles["edit-btn"]} onClick={onEdit}>수정</button>
                <hr />
                <button className={styles['delete-btn']} onClick={onDelete}>삭제</button>
            </div>

        </div >
    );
}

export default EditDeleteModel;