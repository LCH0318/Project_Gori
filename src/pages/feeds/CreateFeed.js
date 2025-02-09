import React, { useState } from "react";
import styles from "../../css/feeds/CreateFeed.module.css";
const CreateFeed = () => {
    const categories = [["건강/운동", "health"],
    ["맛집/카페", "cafe"], ["나들이/여행", "trip"],
    ["제테크", "investment"], ["취미", "hobby"],
    ["일상", "daily"], ["기타", "etc"],];

    const handleBack = ({ onBack }) => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    }

    const [selectedFilter, setSelectedFilter] = useState("건강/운동");

    return (
        <div>
            <div className={styles["header"]}>
                <img src="/images/headerImg.png" onClick={handleBack} />
                <h1>피드글 작성</h1>
            </div>
            <input className={styles["inputTitle"]} placeholder="어떤 주제의 이야기인가요?"></input>
            <div className={styles["container"]}>
                {categories.map((category) => (
                    <button
                        key={category[1]}
                        className={`${styles["category-item"]} ${selectedFilter === category[2] ? styles["selected"] : ""}`}
                        onClick={() => setSelectedFilter(category[1])}>
                        <span className={styles["category-label"]}>{category[0]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CreateFeed;