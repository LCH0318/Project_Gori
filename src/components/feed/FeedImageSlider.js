import React, { useState, useRef } from "react";
import styles from "../../css/feeds/FeedImageSlider.module.css";

const FeedImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const startX = useRef(null);
    const endX = useRef(null);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        endX.current = e.changedTouches[0].clientX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const diff = startX.current - endX.current;
        const swipeThreshold = 50;

        if (diff > swipeThreshold) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else if (diff < -swipeThreshold) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <div
            className={styles["image-slider"]}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <img
                src={images[currentIndex]}
                alt="피드 이미지"
                className={styles["feed-image"]} />
            <div className={styles["indicator-container"]}>
                {images.map((_, index) => (
                    <span
                        key={`dot-${index}`}
                        className={`${styles["indicator-dot"]} ${currentIndex === index ? styles["active"] : ""}`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
    
};

export default FeedImageSlider;
