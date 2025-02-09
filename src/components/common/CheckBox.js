import React from "react";
import styles from "../../css/CheckBox.module.css";

const CheckBox = ({ setVal, val, text, errors = {} }) => {
    const handlerChange = (e) => {
        setVal(e);
    }
    return (
        <label className={errors.privacy && styles["red"]}>
            <input checked={val} type="checkbox" onChange={(e) => handlerChange(e)} />
            <span className={styles["checkBox_custom"]} ></span>{text}
        </label>
    );
}
export default CheckBox;