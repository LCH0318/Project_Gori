import React from "react";
import styles from "../css/CreateSquad.module.css";

const CreateSquad = () => {
    return(
        <>
        <div>
            <form>
                <header className={styles["title"]}>
                    <p>모임글 생성</p>
                </header>

                <div className={styles["titleName"]}>
                    <textarea placeholder="만들고 싶은 모임의 이름을 입력해주세요." onkeydown="title_keydown()" id="title"></textarea>
                </div>

                <div className={styles["example"]}>
                    <p>예시 문구 : 파크골프 치러 가실분~</p>
                </div>

                <div className={styles["theme"]}>
                    <label>주제</label>
                    <div>
                        <button type="button">건강/운동</button>
                        <button type="button">맛집/카페</button>
                        <button type="button">취미</button>
                        <button type="button">나들이/여행</button>
                        <button type="button">제테크</button>
                        <button type="button">일상</button>
                        <button type="button">기타</button>
                    </div>
                </div>

                <div className={styles["squad_plan"]}>
                    <div className={styles['bottom-sheet-height']}>어디서 모일까요?<img src="/images/cursor.png"/></div>
                    <div className={styles["bottom-sheet-height"]}>언제 모일까요?<img src="/images/cursor.png"/></div>
                    <div className={styles["bottom-sheet-height"]}>몇시에 모일까요?<img src="/images/cursor.png"/></div>
                </div>

                <div className={styles["bottom-sheet"]}>
                    <div className={styles["bottom-sheet-content"]}>
                        <div className={styles["city_handle"]}></div>
                        <div className={styles["img_header"]}><img src="../../images/map.png"/><p>어디서 모일까요?</p></div>
                        <div className={styles["citys_list"]}></div>
                        <button className={styles["complete_button"]} disabled>선택 완료</button>
                    </div>
                </div>

                <div className={styles["bottom-sheet"]}>
                    <div className={styles["bottom-sheet-content"]}>
                        <div className={styles["calender_handle"]}></div>
                        <div className={styles["img_header"]}><img src="../../images/calendar.png"/><p>언제 모일까요?</p></div>
                        <div className={styles["calendar"]}></div>
                        <button className={styles["complete_button"]} disabled>선택 완료</button>
                    </div>
                </div>

                <div className={styles["bottom-sheet"]}>
                    <div className={styles["bottom-sheet-content"]}>
                        <div className={styles["img_header"]}><img src="../../images/map.png"/><p>상세 지역도 선택해주세요</p></div>
                        <div className={styles["regions_list"]}></div>
                        <button className={styles["complete_button"]} disabled>선택 완료</button>
                    </div>
                </div>
            </form>
        </div>
        </>);
}

export default CreateSquad;