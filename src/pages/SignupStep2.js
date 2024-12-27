import React,{useEffect, useState} from "react";
import  {useLocation} from "react-router-dom";
import styles from "../css/SignupStep2.module.css";

const SignupStep2 = () =>{

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    const email = params.get("email");

    const [birth, setBirth] = useState("");
    const [isBirthEmpty, setIsBirthEmpty] = useState(false);

    useEffect(() => {
        console.log('birth');
        setIsBirthEmpty(birth === "");
    }, [birth]);

    return(
        <>
            <div className={styles["login_container"]}>
                <header>
                    <span>🙏</span>
                    <p>50대 이상인지 확인할게요!</p>
                </header>
                <form action="SignupStep3" post="get">
                    <div className={styles["input-group"]}>
                        <label>생년월일</label>
                        <input type="text" className={styles["birth"]} name = "birth" placeholder="생년월일 8자리" onChange={(e) => setBirth(e.target.value)}/>
                    </div>
                    <div className={styles["input-group"]}>
                        <label>이름</label>
                        <input type="text" className={styles["name"]} name="name" value={name} placeholder="이름을 입력해주세요!" readOnly/>
                    <div className={styles["input-group"]}></div>    
                        <label>이메일</label>
                        <input type="text" className={styles["email"]} name='email'value={email} readOnly/>
                    </div>
                    <button type="submit" className={styles["next-btn"]} disabled={isBirthEmpty}>다음</button>
                </form> 
            </div>
        </>
    );
}

export default SignupStep2;