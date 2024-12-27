import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "../css/Verification.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";

const Verification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const name = params.get("name");
    const birth = params.get("birth");
    const gender = params.get('gender');
    const phoneProvider = params.get('phone_call');
    const phoneNumber = params.get("phoneNumber");
    const phone_call = params.get("phone_call");
    const totalTime = 300;
    const sheetRef = useRef(null);

    const [code,setCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isComfirmed, setIsComfirmed] = useState(false);
    const [bottomSheetHeight, setBottomSheetHeight] = useState("");
    const [isAgreementAll,setIsAgreementAll] = useState(false);
    const [isAgreementTerms,setIsAgreementTerms] = useState(false);
    const [isAgreementPrivacy,setIsAgreementPrivacy] = useState(false);
    const [isAgreementMarketing,setIsAgreementMarketing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (sheetRef.current) {
            setBottomSheetHeight(sheetRef.current.scrollHeight);
        }
    }, []);
    
    const startTimer = () => {
        setTimeLeft(totalTime);
        setIsTimerActive(true);
    }

    const sendEmail =  async () => {
        try {
            const response = await axios.get("https://gory.seojongchan-dev.com/auth/getCode", {
                params: {email}
            });
            alert("인증번호가 발송 되었습니다. 이메일을 확인해주세요.");
            startTimer();
        } catch (error) {
            startTimer();
            // alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    }

    const register = async () => {
        try{
            const body = {
                email,
                phone_call,
                gender,
                birth,
                name,
                phoneNumber
            };
            // const register = await axios.post(
            //     "https://gory.seojongchan-dev.com/auth/register", 
            //     body
            // );
            // window.location.replace('/location')
            navigate('/login', {replace: true});
        }catch{
            const error = {
                register:"회원가입에 문자가 발생하였습니다.",
                hasError:true,
            };
            showToastMessage(error);
            return;
        }
    }

    useEffect(() =>  { 
        sendEmail();
    }, []);

    useEffect(()=>{
        if(code.length === 5){
            comfirmCode();
        }
    },[code])

    useEffect(() => {
        if (timeLeft <= 0 || !isTimerActive) return;
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, isTimerActive]);

    useEffect(() =>{
        if(isAgreementPrivacy && isAgreementMarketing && isAgreementTerms){
            setIsAgreementAll(true);
        }
        else{
            setIsAgreementAll(false);
        }
    }, [isAgreementMarketing,isAgreementPrivacy,isAgreementTerms])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const resendCode = () =>{
        sendEmail();
    };

    const comfirmCode = async () => {
        // try{
        //     const responseComfirm = await axios.get("https://gory.seojongchan-dev.com/auth/getCode",{
        //         params : {email,code}
        //     });
                setIsComfirmed(true);
                setIsTimerActive(false);
        // } catch(error){
        //     alert("오류");
        // }
    };

    const showToastMessage = (newErrors) => {
        setErrors(newErrors);
        console.log(newErrors)
        setTimeout(() => {
            setErrors({});
        }, 2000);
    }

    const agreementAllHandler = (e) => {
        const checkedStatus = e.target.checked;
        setIsAgreementAll(checkedStatus);
        setIsAgreementTerms(checkedStatus);
        setIsAgreementPrivacy(checkedStatus);
        setIsAgreementMarketing(checkedStatus);
    }

    const agreementHandler = () => {
        const newErrors = {};
        if (!isAgreementTerms) {
            newErrors.terms = "이용약관 동의를 해주세요";
        }
        if (!isAgreementPrivacy) {
            newErrors.privacy = "개인정보처리방침 동의를 해주세요";
        }
        if (Object.keys(newErrors).length) {
            newErrors.hasError = true;
            showToastMessage(newErrors);
            return;
        }
        register();
        // 서버 통신 부분
    }
    return(
        <>
            <div>
                <div className={styles["input-group"]}>
                    <p>방금 이메일로 받으신 숫자 6자리를 입력해주세요.</p>
                    <p>{email}</p>
                    <input placeholder="인증번호를 입력해주세요." maxLength={5} onInput={(e)=>setCode(e.target.value)} value={code} readOnly={!isTimerActive}></input>
                </div>
                {!isComfirmed && <div>
                    <p>{timeLeft > 0 && (
                        <span>남은 시간 : {formatTime(timeLeft)}</span>
                    )}</p>
                </div>}
                {isTimerActive && totalTime - timeLeft >= 10 && (<div className={styles["textBtn"]}> 
                    <button type="button" onClick={() => resendCode()}>
                        <img src="/images/ic_alert.png"/>
                        <div>문자가 안오면 눌러주세요</div>
                    </button>
                </div>)}
                <footer className={styles['footer']}>
                    <button type="button" className={styles['next_btn']} disabled = {code.length !== 5} >다음</button>
                </footer>
                <div className={`${styles['bottomSheet']} ${code.length === 5 ? styles["active"] : ""}`}
                        ref={sheetRef}
                        style={{transform: code.length === 5 ? "TranslateY(0)" : `translateY(${bottomSheetHeight}px)`,
                                transition: "transform 0.3s case-in-out"}}>
                    <div className={styles["useRef"]}>
                        <div>
                            <label>
                                <input type="checkbox" checked={isAgreementAll} onChange={agreementAllHandler}/>
                                <span className={styles["checkBox_custom"]} ></span>약관 전체동의
                            </label>
                        </div>
                        <div>
                            <label className={errors.terms && styles["red"]}>
                                <input type="checkbox" checked={isAgreementTerms} onChange={(e) => setIsAgreementTerms(e.target.checked)}/>
                                <span className={styles["checkBox_custom"]}></span>이용약관 동의(필수)
                            </label>
                        </div>
                        <div>
                            <label className={errors.privacy && styles["red"]}>
                                <input type="checkbox" checked={isAgreementPrivacy} onChange={(e) => setIsAgreementPrivacy(e.target.checked)}/>
                                <span className={styles["checkBox_custom"]}></span>개인정보처리방침 동의(필수)
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" checked={isAgreementMarketing} onChange={(e) => setIsAgreementMarketing(e.target.checked)}/>
                                <span className={styles["checkBox_custom"]}></span>마케팅 활용 및 광고 수신 동의(선택)
                            </label>
                        </div>
                    </div>
                    
                    <button type="button"
                    className={`${styles["startGory"]} ${(!isAgreementPrivacy || !isAgreementTerms) && styles["disabled"]}`} 
                    onClick={() => agreementHandler()}>동의하고 고리 시작</button>

                    
                </div>
                {errors.hasError && (<div className={`${styles["toast_message"]} ${errors.hasError && styles["active"]}`}>
                    {errors.terms && <div>{errors.terms}</div>}
                    {errors.privacy && <div>{errors.privacy}</div>}
                    {errors.register && <div>{errors.register}</div>}
                </div>)}
            </div>
        </>
    );
}

export default Verification;