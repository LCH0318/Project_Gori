import React, { useState } from "react";
import styles from "../../css/feeds/FeedText.module.css";

const FeedText = ({ text }) => {
    const [expanded, setExpanded] = useState(false);

    const maxLines = 4;
    const shouldTruncate = text.split("\n").length > maxLines;
    const truncatedText = text.split("\n").slice(0, maxLines).join("\n");

    return (
        <div className={styles["feed-text"]}>
            <p>{expanded || !shouldTruncate ? text : truncatedText}</p>
            {shouldTruncate && (
                <button
                    className={styles["toggle-text"]}
                    onClick={() => setExpanded(!expanded)}>
                    {expanded ? "접기" : "더보기"}
                </button>
            )}
        </div>
    );
};

export default FeedText;