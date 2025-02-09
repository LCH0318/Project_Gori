import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../css/signup/SignupStep4.module.css";

const SignupStep4 = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get('name') ?? "";
    const birth = params.get('birth') ?? "";
    const gender = params.get('gender') ?? "";
    const email = params.get("email") ?? "";
    const bottomSheetRef = useRef(null);
    const bottomSheetContentRef = useRef(null);

    const [telProvider, setTelProvider] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isNextDisabled, setIsNextDisabled] = useState(true);

    // const bottomSheet = document.querySelector("#bottomSheet");   

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        if (input.length <= 11) {
            setPhoneNumber(input);
        }
    };

    const openBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.classList.add(styles["active"]);
        }
    };

    const handleBottomSheetClick = (e) => {
        if (e.target.tagName.toLowerCase() === 'li') {
            const telProviderName = e.target.innerText;
            setTelProvider(telProviderName);
            // const phoneDiv = document.querySelector("#phone");
            // phoneDiv.style.display = "block";
            if (bottomSheetRef.current) {
                bottomSheetRef.current.classList.remove(styles["active"]);
            }
        } else if (bottomSheetRef.current) {
            bottomSheetRef.current.classList.remove(styles["active"]);
        }
    };

    useEffect(() => {
        setIsNextDisabled(phoneNumber.length < 10);
    }, [phoneNumber]);

    return (
        <>
            <div className={styles["login_container"]}>
                <header>
                    <span>🙏</span>
                    <p>50대 이상인지 확인할게요!</p>
                </header>
                <form action="SignupStep5" method="get">
                    <div className={styles["input-group"]} style={{ display: telProvider ? "block" : "none" }}>
                        <label>휴대폰번호</label>
                        <input
                            type="phone"
                            maxLength="11"
                            name="phoneNumber"
                            id="input_number"
                            placeholder="휴대폰 번호를 입력해주세요!"
                            onChange={handlePhoneNumberChange}
                            value={phoneNumber}
                        />
                    </div>

                    <div className={styles["call-group"]}>
                        <button type="button" className={styles["openSheetBtn"]} onClick={openBottomSheet}>
                            <div>{telProvider || "어디 통신사를 쓰시나요?"}</div>
                            {telProvider !== "" ? <img className={telProvider ? ["hidden"] : ""}
                                src="../../images/edit_24px.png" /> : ""}
                        </button>
                        <input type="text" className={styles["hidden"]} value={telProvider} name="phone_call" />
                    </div>

                    <div className={styles["input-group"]}>
                        <label>성별</label>
                        <div className={styles["gender-group"]}>
                            <label>
                                <input type="radio" value="male" name="gender" className={styles["male"]} checked={gender == 'male'} readOnly />
                                <span className={styles["checkbox-custom"]}></span> 남성
                            </label>
                            <label>
                                <input type="radio" value="female" name="gender" className={styles["female"]} checked={gender == 'female'} readOnly />
                                <span className={styles["checkbox-custom"]}></span> 여성
                            </label>
                        </div>
                    </div>

                    <div className={styles["input-group"]}>
                        <label>생년월일</label>
                        <input type="number" className={styles["birth"]} name="birth" value={birth} placeholder="생년월일 8자리" readOnly />
                    </div>

                    <div className={styles["input-group"]}>
                        <label>이름</label>
                        <input type="text" className={styles["name"]} name="name" value={name} placeholder="이름을 입력해주세요!" readOnly />
                    </div>
                    <div className={styles["input-group"]}>
                        <label>이메일</label>
                        <input type="text" className={styles["email"]} name='email' value={email} readOnly />
                    </div>
                    <button type="submit" className={styles["next-btn"]} disabled={isNextDisabled}>다음</button>
                </form>

                <div className={styles["bottom-sheet"]} ref={bottomSheetRef} onClick={handleBottomSheetClick}>
                    <div className={styles["bottomSheet-content"]} ref={bottomSheetContentRef}></div>
                    <div className={styles["handle"]}></div>
                    <ul>
                        <li>SKT</li>
                        <li>KT</li>
                        <li>LG U+</li>
                        <li>SKT 알뜰폰</li>
                        <li>KT 알뜰폰</li>
                        <li>LG U+ 알뜰폰</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SignupStep4;