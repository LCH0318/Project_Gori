import React, { useState } from "react";
import styles from "../../css/common/CategoryList.module.css"

const CategoryList = () => {
    const [feeds, setFeeds] = useState([]);

    const categories = [["전체", "all"], ["건강/운동", "health"],
    ["맛집/카페", "cafe"], ["나들이/여행", "trip"],
    ["제테크", "investment"], ["취미", "hobby"],
    ["일상", "daily"], ["기타", "etc"],];

    const [selectedFilter, setSelectedFilter] = useState("all");
    // `/images/category/{category[1]}.png`

    return (
        <div className={styles["container"]}>
            {categories.map((category) => (
                <div
                    key={category[1]}
                    className={`${styles["category-item"]} ${selectedFilter === category[1] ? styles["selected"] : ""}`}
                    onClick={() => setSelectedFilter(category[1])}>
                    <div className={styles["category-icon"]}>
                        <img src={`/images/category/${category[1]}.png`} />
                    </div>
                    <span className={styles["category-label"]}>{category[0]}</span>
                </div>
            ))}
        </div>
    )
}

export default CategoryList;