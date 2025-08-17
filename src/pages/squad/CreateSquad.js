// modified create squad : exception check

import React, { useState } from "react";
import styles from "../../css/squad/CreateSquad.module.css";
import { useEffect } from "react";
import AgeSelector from "../../components/squad/AgeSelector";
import RegionBottomSheet from "../../components/feed/bottomsheets/RegionBottomSheet";
import SquadCalendar from "../../components/feed/SquadCalendar";
import SquadTime from "./SquadTime";

const CreateSquad = () => {
    const [timeLeft, setTimeLeft] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastContent, setToastContent] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [squadName, setSquadName] = useState("");
    const [participantsCount, setParticipantsCount] = useState("");
    const categories = [["건강/운동", "health"],
    ["맛집/카페", "cafe"], ["취미", "hobby"], ["나들이/여행", "trip"],
    ["제테크", "investment"],
    ["일상", "daily"], ["기타", "etc"],];
    const genders = ["누구나", "여자만", "남자만"];
    const [ageData, setAgeData] = useState({ ageCategory: "", ageMin: null, ageMax: null });
    const [selectedGender, setSelectedGender] = useState(null);
    const [locationButtonTxt, setLocationButtonTxt] = useState("어디서 모일까요?");
    const [isRegionMainSheetOpen, setIsRegionMainSheetOpen] = useState(false);
    const [isRegionSubSheetOpen, setIsRegionSubSheetOpen] = useState(false);
    const [selectedRegionMain, setSelectedRegionMain] = useState("");
    const [selectedRegionSub, setSelectedRegionSub] = useState(null);
    const [isWhenSquadModalOpen, setIsWhenSquadModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isTimeSquadModalOpen, setIsTimeSquadModalOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState(10);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedMeridiem, setSelectedMeridiem] = useState("오전");
    const [isIndeterminateTime, setIsIndeterminateTime] = useState(null);
    const regionMains = ["서울", "경기", "부산", "대구", "광주"];
    const regionSubs = {
        "서울": ["전체", "강남구", "강동구", "관악구", "광진구", "구로구"],
        "경기": ["전체", "성남시", "수원시", "고양시", "용인시"],
        "부산": ["전체", "해운대구", "부산진구", "동래구"],
        "대구": ["전체", "달서구", "수성구", "중구"],
        "광주": ["전체", "동구", "서구", "북구"]
    };
    const [content, setContent] = useState("");

    const [warningMsg, setWarningMsg] = useState({
        "title": false,
        "category": false,
        "location": false,
        "date": false,
        "time": false,
        "partipantsEmpty": false,
        "partipantsCount": false,
        "male": false,
        "age": false,
    });

    const handleBack = ({ onBack }) => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    }

    const showToastMessage = (message) => {
        setToastContent(message);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
            setToastContent(false);
        }, 3000);
    }

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const handleSquadName = (e) => {
        const value = e.target.value;
        setSquadName(value);
        setWarningMsg(prev => ({
            ...prev,
            title: false
        }));
        if (value.length > 51) {
            showToastMessage("제목은 최대 50자까지만 입력이 가능해요");
        }
    }

    const handlePeopleCount = (e) => {
        const value = e.target.value;
        setParticipantsCount(value);
        setWarningMsg(prev => ({
            ...prev,
            partipantsCount: false,
            partipantsEmpty: false
        }))
        if (value < 2) {
            showToastMessage("인원수는 최소 2명부터 입력이 가능해요");
        } else if (value > 30) {
            showToastMessage("인원수는 최대 30명까지 입력이 가능해요");
        } else {
            setToastContent(false);
        }

    };

    const handleCategorySelect = (category) => {
        setWarningMsg(prev => ({
            ...prev,
            category: false
        }))
        setSelectedCategory(category === selectedCategory ? null : category);
        // setTitle(true);
    }

    const handleGenderBtn = (e) => {
        setWarningMsg(prev => ({
            ...prev,
            gender: false
        }))
        setSelectedGender(e);
    }

    const handleAgeChange = (data) => {
        setWarningMsg(prev => ({
            ...prev,
            age: false
        }))
        setAgeData(data);
    }

    const handleContent = (e) => {
        if (content.length < 1000) {
            setContent(e.target.value);
        }
    }

    const openRegionMainSheet = () => {
        setWarningMsg(prev => ({
            ...prev,
            location: false
        }))
        setIsRegionMainSheetOpen(true);
    }
    const closeRegionMainSheet = () => setIsRegionMainSheetOpen(false);


    const openRegionSubSheet = () => {
        setIsRegionSubSheetOpen(true);
    };
    const closeRegionSubSheet = () => {
        setIsRegionSubSheetOpen(false);

        if (selectedRegionSub === "") {
            setSelectedRegionMain("");
        }
    };

    const handleRegionMainConfirm = () => {
        closeRegionMainSheet();
        openRegionSubSheet();
    };

    const handleRegionSubConfirm = () => {
        closeRegionSubSheet();
        console.log(selectedRegionMain, selectedRegionSub);
        setLocationButtonTxt(selectedRegionMain + " " + selectedRegionSub);
    }

    const handleWhenSquadOpen = () => {
        setWarningMsg(prev => ({
            ...prev,
            date: false
        }))
        setIsWhenSquadModalOpen(true);
    }

    const handleWhenSquadClose = () => setIsWhenSquadModalOpen(false);

    const handleWhenSquadSelect = (date) => {
        setSelectedDate(date);
        handleWhenSquadClose();
    };

    const formatDate = (date) => {
        if (!date) return "언제 모일까요?";
        const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${days[date.getDay()]}`;
    };

    const formatTime = () => {
        if (isIndeterminateTime === null) return '몇시에 모일까요?';
        if (isIndeterminateTime) return "시간 미정";
        return `${selectedMeridiem} ${selectedHour}:${selectedMinute < 10 ? '0' + selectedMinute : selectedMinute}`;
    }

    const handleTimeSquadModalOpen = () => {
        setWarningMsg(prev => ({
            ...prev,
            time: false
        }))
        setIsTimeSquadModalOpen(true);
    }

    const hanldeTimeSquadClose = () => setIsTimeSquadModalOpen(false);

    const handleTimeSquadSelect = (hour, minute, meridiem, isIndeterminate) => {
        setSelectedHour(hour);
        setSelectedMinute(minute);
        setSelectedMeridiem(meridiem);
        setIsIndeterminateTime(isIndeterminate);
        console.log(`isIndeterminate: ${isIndeterminate}`);
    };

    const handleConfirm = () => {
        const newWarnings = {
            "title": false,
            "category": false,
            "location": false,
            "date": false,
            "time": false,
            "partipantsEmpty": false,
            "partipantsCount": false,
            "male": false,
            "age": false,
        };

        newWarnings.title = squadName.trim() === '';
        newWarnings.category = selectedDate === null;
        newWarnings.date = selectedDate === null;
        newWarnings.location = selectedRegionMain === '';
        newWarnings.time = isIndeterminateTime === null;
        newWarnings.partipantsEmpty = participantsCount === "";
        newWarnings.partipantsCount = participantsCount == 1;
        newWarnings.male = selectedGender === null;
        newWarnings.age = ageData.ageMax === null || ageData.ageMin === null;

        setWarningMsg(newWarnings);
        console.log(newWarnings);
        if (!squadName.trim() || selectedCategory === null || locationButtonTxt || selectedDate || participantsCount || selectedGender || ageData)
            console.log(!squadName.trim(), selectedCategory, locationButtonTxt, selectedDate, participantsCount, selectedGender, ageData);
        showToastMessage("입력되지 않은 내용이 있어요.");
    }

    return (
        <div>
            <div className={styles["container"]}>
                <div className={styles["header"]}>
                    <img src="/images/headerImg.png" onClick={handleBack} />
                    <h1>모임글 작성</h1>
                </div>

                <div className={styles["squadName"]}>
                    <textarea
                        className={warningMsg.title ? styles["red"] : ''}
                        placeholder="만들고 싶은 모임의 이름을 입력해주세요."
                        onChange={(e) => handleSquadName(e)}
                    ></textarea>
                </div>

                <input placeholder="예시 문구 : 파크골프 치러 가실분~" className={styles["suqadNameExample"]} disabled />

                <div className={styles["theme"]}>
                    <label className={warningMsg.category ? styles["red"] : ''}>주제</label>
                </div>
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

                <div className={styles["squadLocation"]}
                    onClick={openRegionMainSheet}
                >
                    <div className={`${warningMsg.location ? styles["red"] : ''} ${styles["location"]}`} >{locationButtonTxt}</div>
                    <img src="/images/cursor.png"></img>
                </div>
                <div className={styles["whenSquad"]}
                    onClick={handleWhenSquadOpen}>
                    <div className={`${warningMsg.date ? styles['red'] : ''} {styles["when"]} ${selectedDate ? styles["selectedText"] : ""}`}>{formatDate(selectedDate)}</div>
                    <img src="/images/cursor.png"></img>
                </div>
                <div className={styles["timeSquad"]}
                    onClick={handleTimeSquadModalOpen}>
                    <div className={`${warningMsg.time ? styles["red"] : ''} ${styles["hour"]}`}>{formatTime()}</div>
                    <img src="/images/cursor.png"></img>
                </div>
                <div className={styles["totalSquad"]}>
                    <div>몇명이 모일까요?</div>
                    <div className={`${warningMsg.partipantsEmpty ? styles["red"] : ''} ${styles["people"]}`}>나를 포함해서 총
                        <input
                            onChange={(e) => handlePeopleCount(e)}
                            type="number"
                            min="2"
                            className={`${warningMsg.partipantsCount ? styles["red"] : styles[""]}`}
                        /> 명</div>
                    <div className={styles["male"]}>
                        <div
                            className={`${warningMsg.male ? styles["red"] : styles[""]}`}
                        >성별</div>
                        <div className={styles["genderContainer"]} >
                            {genders.map((gender, index) => (
                                <button
                                    key={`gender${index}`}
                                    className={`${styles["genderBtn"]} ${gender === selectedGender ? styles["active"] : ""}`}
                                    value={gender}
                                    onClick={(e) => handleGenderBtn(gender)}
                                >{gender}</button>
                            ))}
                        </div>
                    </div>
                    <div className={styles["age"]}>
                        <div
                            className={`${warningMsg.age ? styles["red"] : styles[""]}`}
                        >나이</div>
                        <AgeSelector onChange={handleAgeChange} />
                    </div>
                </div>
                <div className={styles["squadTitle"]}>
                    <textarea
                        placeholder="어떤 모임인지 자유롭게 적어주세요!"
                        maxLength="1000"
                        value={content}
                        onChange={handleContent}
                    ></textarea>
                    <p className={styles["contentLength"]}>{content.length}/1,000</p>
                </div>
                <div className={styles["squadConfirm"]}>
                    <p>모임장 승인제</p>
                    <label className={styles["checkMark-custom"]}>
                        <input type="checkbox" />
                        <span className={styles["custom-mark"]} />누구나 참여 가능
                    </label>
                    <label className={styles["checkMark-custom"]}>
                        <input type="checkbox" />
                        <span className={styles["custom-mark"]} />모임장이 승인해야 참여 가능
                    </label>
                </div>
                <RegionBottomSheet
                    isOpen={isRegionMainSheetOpen}
                    title="어디서 모일까요"
                    items={regionMains}
                    selectedItem={selectedRegionMain}
                    onSelect={setSelectedRegionMain}
                    onClose={closeRegionMainSheet}
                    onConfirm={handleRegionMainConfirm}
                />
                <RegionBottomSheet
                    isOpen={isRegionSubSheetOpen}
                    title="상세 지역도 선택해주세요"
                    items={regionSubs[selectedRegionMain] || []}
                    selectedItem={selectedRegionSub}
                    onSelect={setSelectedRegionSub}
                    onClose={closeRegionSubSheet}
                    onConfirm={handleRegionSubConfirm}
                />
                <SquadCalendar
                    isOpen={isWhenSquadModalOpen}
                    onClose={handleWhenSquadClose}
                    onSelect={handleWhenSquadSelect}
                    currentDate={selectedDate}
                />
                <SquadTime
                    isOpen={isTimeSquadModalOpen}
                    onClose={hanldeTimeSquadClose}
                    onSelect={handleTimeSquadSelect}
                />
                {toastContent && <div className={`${styles["toast_message"]} ${styles["active"]}`}>{toastContent}</div>}
            </div>
            {<button className={styles["squadConfirmBtn"]} onClick={handleConfirm}>모임글 작성완료</button>}
        </div>
    );
}
export default CreateSquad;