import React, { useState, useRef } from "react";
import styles from "../../css/feeds/CreateFeed.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreateFeed = () => {
    const navigate = useNavigate();

    const categories = [["건강/운동", "health"],
    ["맛집/카페", "cafe"], ["취미", "hobby"], ["나들이/여행", "trip"],
    ["제테크", "investment"],
    ["일상", "daily"], ["기타", "etc"],];

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState('');
    const [isSendProcessing, setIsSendProcessing] = useState(false);
    // const [title, setTitle] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const showToastMessage = () => {
        setIsSendProcessing(true);
        setTimeout(() => {
            setTimeLeft();
            setIsSendProcessing(false);
        }, 2000);
    }

    const handleBack = ({ onBack }) => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    }

    const handleCategorySelect = (category) => {
        if (selectedCategory !== null) {
            setIsCollapsed(!isCollapsed);
        } else {
            setSelectedCategory(category);
            setIsCollapsed(false);
        }
    }

    const handleTextChange = (e) => {
        if (e.target.value.length <= 5000) {
            setContent(e.target.value);
        }
    }

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (images.length + files.length > 10) {
            alert("최대 10장까지 업로드 가능합니다.");
            return;
        }

        const newImages = files.map((file => URL.createObjectURL(file)));
        setImages([...images, ...newImages]);
    }

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    }

    const showError = (msg) => {
        setErrorMsg(msg);
        setTimeout(() => {
            setErrorMsg("");
        }, 2000);
    }

    const handleFeedUpload = async () => {
        const msg = checkValidation();
        if (msg) {
            showError(msg);
            return;
        }
        setIsSendProcessing(true);
        try {
            const formData = new FormData();
            formData.append("category", selectedCategory);
            formData.append("content", content);
            images.forEach((image, index) => {
                formData.append("images", image);
            });

            const { data } = await axios.post("/feed", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                }
            });
            if (data.status == 200) {
                navigate("/");
            } else {
                // 오류 메시지 띄우기
            }
        } catch (error) {
            console.error("업로드 실패: ", error);
            alert("업로드에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsSendProcessing(false);
        }
    };

    const checkValidation = () => {
        if (selectedCategory === null) {
            return "주제를 선택해주세요";
        } else if (content === "" && images.length == 0) {
            return "내용을 입력해주세요";
        }
        return "";
    }

    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                <img src="/images/headerImg.png" onClick={handleBack} />
                <h1>피드글 작성</h1>
            </div>
            {!isCollapsed ? (
                <>
                    <div className={styles["inputTitle"]}>어떤 주제의 이야기인가요?</div>
                    <div className={styles["category-container"]}>
                        {categories.map((category) => (
                            <button
                                key={category[1]}
                                className={`${styles["category-item"]} ${selectedCategory !== null && selectedCategory[1] === category[1] ? styles["active"] : ""}`}
                                onClick={() => handleCategorySelect(category)}
                            >
                                <span className={styles["category-label"]}>{category[0]}</span>
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className={styles["selected-category"]} onClick={() => setIsCollapsed(false)}>
                    <span>{selectedCategory[0]}</span>
                    <img className={styles["arrow"]} src="/images/cursor.png"></img>
                </div>
            )}
            <hr className={styles["horizontal-line"]} />
            <div className={styles["text-container"]}>
                <textarea
                    placeholder="자유롭게 이야기해보세요!"
                    maxLength="5000"
                    value={content}
                    onChange={handleTextChange}>
                </textarea>
                <p className={styles["text-count"]}>{content.length}/5,000</p>
            </div>
            <div className="image-upload-container">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                />
                <div className={styles["feed-img-scroll"]}>
                    <div className={styles["image-upload-btn"]} onClick={() => fileInputRef.current.click()}>
                        <img src="/images/camera.png" />
                        <p>{images.length}/10</p>
                    </div>
                    <div className={styles["image-list"]}>
                        {images.map((image, index) => (
                            <div key={`image-${index}`} className={styles["image-preview"]}>
                                <img src={image} alt={`uploaded ${index + 1}`} />
                                <button className={styles["remove-btn"]} onClick={() => removeImage(index)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles["alert-text"]}>
                <img src="/images/alert.png" />
                <p>사진은 선택한 순서대로 10개까지만 등록됩니다.</p>
            </div>
            <button
                onClick={() => handleFeedUpload()}
                className={`${styles['create-button']} ${checkValidation() === "" ? styles['active'] : styles[""]}`}
            // className={title ? styles["active"] : ""}
            >올리기
            </button>
            {errorMsg && <div className={`${styles["toast_message"]} ${styles["active"]}`} >
                {errorMsg}
            </div>}
        </div>
    );
}

export default CreateFeed;