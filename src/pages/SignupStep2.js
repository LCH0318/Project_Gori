import React,{useEffect, useState} from "react";
import  {useLocation} from "react-router-dom";
import "../css/signup_step2.css";

const SignupStep2 = () =>{

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get("name");

    const [birth, setBirth] = useState("");
    const [isBirthEmpty, setIsBirthEmpty] = useState(false);

    useEffect(() => {
        console.log('birth');
        setIsBirthEmpty(birth === "");
    }, [birth]);

    return(
        <>
            <div className="login_container">
                <header>
                    <span>🙏</span>
                    <p>50대 이상인지 확인할게요!</p>
                </header>
                <form action="SignupStep3" post="get">
                    <div className="input-group">
                        <label>생년월일</label>
                        <input type="text" id="birth" name = "birth" placeholder="생년월일 8자리" onChange={(e) => setBirth(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label>이름</label>
                        <input type="text" id="name" name="name" value={name} placeholder="이름을 입력해주세요!" readOnly/>
                    </div>
                    <button type="submit" id="next-btn" className={isBirthEmpty ? "disabled" : ""} disabled={isBirthEmpty}>다음</button>
                </form> 
            </div>
        </>
    );
}

export default SignupStep2;