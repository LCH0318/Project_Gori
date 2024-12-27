import React from "react";
import styles from "../css/FindAcount.module.css";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";


const FindAccount= () =>{
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [timeLeft, setTimeLeft] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isSendProcessing, setIsSendProcessing] = useState(false);
    const [userEmail, setUserEmail] = useState(''); 
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const showToastMessage = () => {
        setIsSendProcessing(true);
        setTimeout(() => {
            setTimeLeft(7);
            setIsEmailSent(true);
            setIsSendProcessing(false);
        }, 2000);
    }

    const verificatonEmail = () => {
        showToastMessage();
        handleGetCode();
    }

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const emailReg = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    const emailCheck = (userEmail) =>{
        setIsEmailValid(emailReg.test(userEmail));
    }

    const handleGetCode = async () =>{
        try {
            const response = await axios.post("https://gory.seojongchan-dev.com/auth/findAccount/getCode", {
                email:userEmail,
            });
        } catch (error) {
            // alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    }

    const handleVarifyCode = async () =>{
        try {
            const response = await axios.post("https://gory.seojongchan-dev.com/auth/findAccount/varify", {
                email:userEmail,
                code:verificationCode,
            });
            const { varifyToken } = response.data;
            navigate(`/FindAccountResult/${varifyToken}`);
        } catch (error) {
            // alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
            
            navigate("/FindAccountResult/testtoken123");
        }
    }

    return(
        <>
            <p>가입하신 이메일을 알려주시면 계정을 찾아드릴게요</p>
            <div className={styles["input-label"]}>
                <label>이메일</label>
            </div>
            <div className={styles["phone"]}>
                <input 
                        placeholder="user@gory.com" 
                        maxLength='50'
                        onChange={(e)=>{
                            setUserEmail(e.target.value);
                            emailCheck(e.target.value)
                        }}
                />
                <button 
                        type="button" 
                        onClick={() => verificatonEmail()}
                        className={isEmailValid?styles["active"]:""}
                        disabled={!isEmailValid}>
                            {!isEmailSent ? "인증받기" : "다시받기"}
                </button>
            </div>  
            <div className={styles["input-label"]}>
                <label>인증번호</label>
            </div>
            <div className={styles["verificaton"]}>
                <input
                    maxLength='5'
                    onChange={(e) =>
                        {setVerificationCode(e.target.value)
                    }}
                />
            </div>
            <button
                onClick={() => handleVarifyCode()} 
                className=
                    {`${styles["completeButton"]}
                    ${verificationCode.length === 5 ? styles["active"] : ""}`}
            >완료
            </button>
            {isSendProcessing && <div className={`${styles["toast_message"]} 
                ${styles["active"]}`} >
                인증번호가 전송될 때까지 5초정도 기다려주세요
            </div>}
        </>
    );
}

export default FindAccount;