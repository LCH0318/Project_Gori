import React, { useState } from "react";
import styles from "../../css/squad/CreateSquad.module.css";
import { useEffect } from "react";

const CreateSquad = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [createName, setCreateName] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const city_list = ["서울", "경기", "인천", "부산"];
    const regions_list = ["전체", "강남구", "강동구", "강북구", "강서구", "관악구"];

    const showToastMessage = () => {
        setTimeout(() => {
            setTimeout(7);
        }, 2000);
    }

    const textChange = (e) => {
        if (e > 50) {
            setCreateName(true);
            showToastMessage();
        }
    }

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const handleActive = (index) => {
        setActiveTab(index);
    }

    return (
        <>
            <div>
                <form>
                    <header className={styles["title"]}>
                        <p>모임글 생성</p>
                    </header>

                    {/* 토스트메시지 */}
                    <div className={styles["titleName"]}>
                        <textarea placeholder="만들고 싶은 모임의 이름을 입력해주세요." onkeydown="title_keydown()" id="title"
                            className={{ createName } ? `${styles["toast_message"]} ${styles["active"]}` : ""}
                            onChange={(e) => { textChange(e.target.value) }}>제목은 최대 50자까지만 입력이 가능해요</textarea>
                    </div>

                    <div className={styles["example"]}>
                        <p>예시 문구 : 파크골프 치러 가실분~</p>
                    </div>

                    <div className={styles["theme"]}>
                        <label>주제</label>
                        <div>
                            <button type="button"
                                onClick={() => { handleActive(1) }}
                                className={activeTab === 1 ? styles["active"] : ""}>
                                건강/운동
                            </button>
                            <button type="button"
                                onClick={() => { handleActive(2) }}
                                className={activeTab === 2 ? styles["active"] : ""}>
                                맛집/카페
                            </button>
                            <button type="button"
                                onClick={() => { handleActive(3) }}
                                className={activeTab === 3 ? styles["active"] : ""}>
                                취미
                            </button>
                            <button type="button"
                                onClick={() => { handleActive(4) }}
                                className={activeTab === 4 ? styles["active"] : ""}>
                                나들이/여행
                            </button>
                            <button type="button"
                                onClick={() => { handleActive(5) }}
                                className={activeTab === 5 ? styles["active"] : ""}>
                                제테크
                            </button>
                            <button type="button"
                                onClick={() => { handleActive(6) }}
                                className={activeTab === 6 ? styles["active"] : ""}>
                                일상
                            </button>
                            <button type="button"
                                onClick={() => { handleActive(7) }}
                                className={activeTab === 7 ? styles["active"] : ""}>
                                기타
                            </button>
                        </div>
                    </div>

                    <div className={styles["squad_plan"]}>
                        <div className={styles['bottom-sheet-height']} onClick={() => { }}>어디서 모일까요?<img src="/images/cursor.png" /></div>
                        <div className={styles["bottom-sheet-height"]}>언제 모일까요?<img src="/images/cursor.png" /></div>
                        <div className={styles["bottom-sheet-height"]}>몇시에 모일까요?<img src="/images/cursor.png" /></div>
                    </div>

                    {/* 바텀시트 3개 */}
                    <div className={styles["bottom-sheet"]} >
                        <div className={styles["bottom-sheet-content"]}>
                            <div className={styles["city_handle"]}></div>
                            <div className={styles["img_header"]}><img src="../../images/map.png" /><p>어디서 모일까요?</p></div>
                            <div className={styles["citys_list"]}>{city_list}</div>
                            <button className={styles["complete_button"]} disabled>선택 완료</button>
                        </div>
                    </div>

                    <div className={styles["bottom-sheet"]}>
                        <div className={styles["bottom-sheet-content"]}>
                            <div className={styles["img_header"]}><img src="../../images/map.png" /><p>상세 지역도 선택해주세요</p></div>
                            <div className={styles["regions_list"]}>{regions_list}</div>
                            <button className={styles["complete_button"]} disabled>선택 완료</button>
                        </div>
                    </div>

                    <div className={styles["bottom-sheet"]}>
                        <div className={styles["bottom-sheet-content"]}>
                            <div className={styles["calender_handle"]}></div>
                            <div className={styles["img_header"]}><img src="../../images/calendar.png" /><p>언제 모일까요?</p></div>
                            <div className={styles["calendar"]}></div>
                            <button className={styles["complete_button"]} disabled>선택 완료</button>
                        </div>
                    </div>
                </form>
            </div>
        </>);
}

export default CreateSquad;