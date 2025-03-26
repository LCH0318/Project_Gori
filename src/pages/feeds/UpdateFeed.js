import React, { useState, useEffect, useRef } from "react";
import dummyFeeds from "../../dummies/dummyFeeds";
import styles from "../../css/feeds/CreateFeed.module.css";
import { useParams, useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateFeed = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const feedId = parseInt(id);
    const [feed, setFeed] = useState();

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

    // api 호출해서 피드 불러오기기
    // useEffect(() => {
    //     if (location.state?.feed) {
    //         setFeed({ ...location.state.feed, newImages: [], removedImages: [] });
    //     } else {
    //         axios.get(`/api/feeds/${id}`)
    //             .then(response => setFeed(response.data))
    //             .catch(error => console.error("피드 데이터 불러오기 오류:", error));
    //     }
    // }, [id, location.state]);

    useEffect(() => {
        const foundFeed = dummyFeeds.find(feed => feed.id === feedId);
        if (foundFeed) {
            setFeed({ ...foundFeed, newImages: [], removedImages: [] });
        } else {
            alert("피드를 찾을 수 없습니다.");
            navigate(-1);
        }
    }, [id]);

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
        // setSelectedCategory(category === selectedCategory ? null : category);
        // console.log(category);
        // setTitle(true);
        if (selectedCategory !== null && selectedCategory[0] === category[0]) {
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
        <div>
            <div className={styles["header"]}>
                <img src="/images/headerImg.png" onClick={handleBack} />
                <h1>피드글 수정</h1>
            </div>
            {!isCollapsed ? (
                <>
                    <p className={styles["inputTitle"]} placeholder="어떤 주제의 이야기인가요?" disabled></p>
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
                    value={feed.text}
                    onChange={handleTextChange}>
                </textarea>
                <p className={styles["text-count"]}>{feed.text.length}/ 5,000</p>
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

export default UpdateFeed;