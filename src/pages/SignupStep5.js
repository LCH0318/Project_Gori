import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/SignupStep5.module.css";
 
const SignupStep5 = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const name = params.get("name");
    const birth = params.get("birth");
    const gender = params.get('gender');
    const phoneProvider = params.get('phone_call');
    const phoneNumber = params.get("phoneNumber");
    const email = params.get("email");

    const [errors, setErrors] = useState({});

    const calculateAge = (birth) => {
        console.log(birth)
        const birthYear = parseInt(birth.slice(0, 4), 10);
        const birthMonth = parseInt(birth.slice(4, 6), 10) - 1;
        const birthDay = parseInt(birth.slice(6, 8), 10);

        const today = new Date();
        const birthDate = new Date(birthYear, birthMonth, birthDay);

        let age = today.getFullYear() - birthYear;
        if (today.getMonth() < birthMonth || 
            (today.getMonth === birthMonth && today.getDate() < birthDate)) {
            age--;
        }
        return age;
    }

    const showToastMessage = () => {
        setTimeout(() => {
            setErrors({});
        }, 2000);
    }

    const onSubmitHandler = async (e) =>{
        e.preventDefault();

        const newErrors = {};
        const age = calculateAge(birth);
        if (age < 50) {
            newErrors.birth = "고리는 50세 이상부터 가입하실 수 있어요";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            showToastMessage();
            return;
        }
        e.target.submit();
    }

    //phoneNumber=01097224665&phone_call=&gender=male&birth=20000318
    //name=%EC%9E%84%EC%B0%BD%ED%9C%98
    return (
        <>
            <div className={styles.signupContainer}>
                <div className={styles.content}>
                    <header>
                        <span>🙏</span>
                        <p>작성해주셔서 감사합니다! <br/>다음 버튼을 눌러주세요!</p>
                    </header> 
                    <form action="verification" method="get" onSubmit={onSubmitHandler}>
                        <div className={styles["input-group"]}>
                            <label>휴대폰번호</label>
                            <input type="phone" maxLength="11" value={phoneNumber} placeholder="휴대폰 번호를 입력해주세요!" readOnly/>
                        </div>

                        <div>
                            <button className={styles["provider"]} onClick={(e) => {e.preventDefault()}}>{phoneProvider}</button>  
                            <input type="text" className={styles["hidden"]} value={phoneProvider} name="phone_call" readOnly/>
                        </div>

                        <div className={styles["input-group"]}>
                            <label>성별</label>
                            <div className={styles["gender-group"]}>
                                <label>
                                    <input type="radio" value="male" name="gender" id="male" checked={gender === 'male'} readOnly />
                                    <span className={styles["checkbox-custom"]} id="gender-male" ></span> 남성
                                </label>
                                <label>
                                    <input type="radio" value="female" name="gender" id="female"  checked={gender === 'female'} readOnly />
                                    <span className={styles["checkbox-custom"]} id="gender-female" ></span> 여성
                                </label>
                            </div>
                        </div>

                        <div className={styles["input-group"]}>
                            <label>생년월일</label>
                            <input type="number" id="birth" name="birth" value={birth} placeholder="생년월일 8자리"  readOnly/>
                        </div>

                        <div className={styles["input-group"]}>
                            <label>이름</label>
                            <input type="text" id="name" name="name" value={name}placeholder="이름을 입력해주세요!" readOnly/>
                        </div>
                        <div className={styles["input-group"]}>
                        <label>이메일</label>
                        <input type="text" className={styles["email"]} name='email'value={email} readOnly/>
                    </div>
                    <div className={styles["footer"]}>
                        <button type="submit" className={styles["next-btn"]} value="다음">다음</button>
                    </div>

                    </form>
                </div>
                {errors.birth && (<div className={`${styles["tost_message"]} ${errors.birth && styles["active"]}`}>
                    {errors.birth}
                </div>)}
            </div>
        </>
    );
};

export default SignupStep5;