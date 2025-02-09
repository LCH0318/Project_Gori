import React, { useState, forwardRef } from "react";
import FeedImageSlider from "./FeedImageSlider";
import FeedText from "./FeedText";
import styles from "../../css/feeds/FeedItem.module.css"

const FeedItem = forwardRef(({ feed }, ref) => {
    const [liked, setLiked] = useState(feed.liked);
    const [likeCount, setLIkeCount] = useState(feed.likeCount);
    const [commentCount, setCommentCount] = useState(feed.commentCount);

    const toggleLike = () => {
        setLiked(!liked);
        setLIkeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    return (
        <div className={styles["feed-item"]} ref={ref}>
            <div className={styles["feed-header"]}>
                <img
                    src={feed.profileImage}
                    alt="프로필"
                    className={styles["profile-img"]} />
                <div className={styles["feed-user"]}>
                    <p className={styles["username"]}>{feed.nickname}</p>
                    <p className={styles["timestamp"]}>{feed.timestamp}</p>
                </div>
            </div>

            {feed.images.length > 0 && <FeedImageSlider images={feed.images} />}

            <FeedText text={feed.text} />

            <div className={styles["feed-actions"]}>
                <button
                    className={`${styles["like-button"]} ${liked ? styles["liked"] : ""}`}
                    onClick={toggleLike}
                >
                    좋아요 {likeCount}
                </button>
                <button className={styles["comment-button"]}>댓글 {feed.commentCount}</button>
                <button className={styles["share-button"]}></button>
            </div>
        </div>
    )
});

export default FeedItem;