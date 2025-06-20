import React, { useState } from "react";
import Header from "../../components/login_header/Header";
import styles from "../../css/chat/CreateChatting.module.css";
import Chatting from "../chat/Chatting";

const CreateChatting = () => {
    const categories = [["건강/운동", "health"],
    ["맛집/카페", "cafe"], ["취미", "hobby"], ["나들이/여행", "trip"],
    ["제테크", "investment"],
    ["일상", "daily"], ["기타", "etc"],];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [titleText, setTitleText] = useState('');
    const [chatText, setChatText] = useState("");
    const [peopleCount, setPeoleCount] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [toastContent, setToastContent] = useState(null);

    const showToastMessage = (message) => {
        setToastContent(message);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
            setToastContent(false);
        }, 3000);
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    }

    const isHeaderSheetOpen = () => {

    }

    const isHeaderSheetClose = () => {

    }

    const handleTitleTextChange = (e) => {
        if (e.target.value.length <= 30) {
            setTitleText(e.target.value)
        }
    }

    const handleChatTextChange = (e) => {
        if (e.target.value.length <= 100) {
            setChatText(e.target.value)
        }
    }

    const handlePeopleCount = (e) => {
        const value = e.target.value;
        setPeoleCount(value);
    }

    const handleToastMessage = (e) => {
        if (peopleCount < 2) {
            showToastMessage("인원은 본인포함 최소 2명부터 입력 가능해요");
        } else {
            setToastContent(false);
        }
        if (!titleText) {
            showToastMessage("주제를 선택해주세요")
        } else {
            setToastContent(false);
        }
        if (!chatText) {
            showToastMessage("내용을 입력해주세요요")
        } else {
            setToastContent(false);
        }
        if (peopleCount > 3 && !titleText && !chatText) {
            <Chatting />
        }
    }

    return (
        <div className={styles["container"]}>
            <div className={styles["chattingHeader"]}>
                <Header
                    isOpen={isHeaderSheetOpen}
                    title="채팅방 만들기"
                    isClose={isHeaderSheetClose}
                />
            </div>
            <div className={styles["chattingCategory"]}>
                <div>어떤 주제의 채팅방인가요?</div>
                <div className={styles["category-container"]}>
                    {categories.map((category) => (
                        <button
                            key={category[1]}
                            className={`${styles["category-item"]} ${selectedCategory === category[1] ? styles["active"] : ""}`}
                            onClick={() => handleCategorySelect(category[1])}
                        >
                            <span className={styles["category-label"]}>{category[0]}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles["chattingTitle"]}>
                <input
                    className={styles["titleContainer"]}
                    placeholder="채팅방 이름을 입력해주세요."
                    value={titleText}
                    maxLength="30"
                    onChange={handleTitleTextChange}
                />
                <div>{titleText.length}/30</div>
            </div>

            <div className={styles["chatting"]}>
                <textarea
                    placeholder="채팅방을 소개해보세요!"
                    className={styles["chattingText"]}
                    value={chatText}
                    maxLength="100"
                    onChange={handleChatTextChange}
                />
                <div className={styles["chatTextLength"]}>{chatText.length}/100</div>
            </div>

            <div
                className={styles["manyPeople"]}
            >몇명이 모일까요? (최대100명)</div>

            <div
                className={styles["people"]}
            >나를 포함해서 총
                <input
                    className={styles["inputPeolple"]}
                    type="number"
                    min="2"
                    onChange={handlePeopleCount}
                />명
            </div>
            {toastContent && <div className={`${styles["toast_message"]} ${styles["active"]}`}>{toastContent}</div>}
            <div className={styles["confirm-btn"]} onClick={handleToastMessage}>만들기</div>
        </div>
    );
};

export default CreateChatting;