import React, { useState } from "react";
import AgeRangeInput from "./AgeRangeInput";
import styles from "../../css/squad/AgeSelector.module.css";

const AgeSelector = ({ onChange }) => {
    const [selectedAge, setSelectedAge] = useState("");
    const [customAge, setCustomAge] = useState(false);
    const [ageMin, setAgeMin] = useState("");
    const [ageMax, setAgeMax] = useState("");

    const ageOptions = ["누구나", "50대", "60대", "70대", "80대", "직접입력"];

    const handleAgeSelect = (age) => {
        setSelectedAge(age);
        if (age === "직접입력") {
            setCustomAge(true);
            if (!selectedAge.includes("대")) {
                setAgeMin("");
                setAgeMax("");
            } else {
                const min = parseInt(selectedAge.replace("대", ""), 10);
                setAgeMin(min);
                setAgeMax(min + 9);
            }
        } else {
            setCustomAge(false);
            const min = parseInt(age.replace("대", ""), 10);
            setAgeMin(min);
            setAgeMax(min + 9);
            // setAgeMin("");
            // setAgeMax("");
            onChange({ ageCategory: age, ageMin, ageMax });
        }
    };

    const handleCustomAgeChange = ({ ageMin, ageMax }) => {
        setAgeMin(ageMin);
        setAgeMax(ageMax);
        onChange({ ageCategory: "직접입력", ageMin, ageMax });
    };

    return (
        <div className={styles["age-selector-container"]}>
            <div className={styles["age-buttons"]}>
                {ageOptions.map((age) => (
                    <button
                        key={age}
                        className={`${styles["age-option"]} ${styles[selectedAge === age ? "selected" : ""]}`}
                        onClick={() => handleAgeSelect(age)}
                    >
                        {age}
                    </button>
                ))}
            </div>
            {customAge && <AgeRangeInput ageMin={ageMin} ageMax={ageMax} onChange={handleCustomAgeChange} />}
        </div>
    );
};

export default AgeSelector;