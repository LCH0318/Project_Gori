import React, { useState, useEffect } from "react";
import styles from "../../css/squad/AgeRangeInput.module.css";

const AgeRangeInput = ({ ageMin, ageMax, onChange }) => {
    const [minAge, setMinAge] = useState(ageMin);
    const [maxAge, setMaxAge] = useState(ageMax);

    useEffect(() => {
        setMinAge(ageMin);
        setMaxAge(ageMax);
    }, [ageMin, ageMax]);

    const handleMinChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 50) value = 50;
        if (value > maxAge) value = maxAge;
        setMinAge(value);
        onChange({ ageMin: value, ageMax });
    };

    const handleMaxChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < minAge) value = minAge;
        if (value > 80) value = 80;
        setMaxAge(value);
        onChange({ ageMax: value, ageMin: minAge });
    };

    return (
        <div className={styles["age-range-container"]}>
            <input
                type="number"
                className={styles["age-input"]}
                value={minAge}
                onChange={handleMinChange}
                min="50"
                max="80"
            />
            <span className={styles["age-seperator"]}>~</span>
            <input
                type="number"
                className={styles["age-input"]}
                value={maxAge}
                onChange={handleMaxChange}
                min={minAge}
                max="80"
            />
            <span className={styles["age-label"]}>세</span>
        </div>
    );
};

export default AgeRangeInput;