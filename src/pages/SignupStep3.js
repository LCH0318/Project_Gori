import React, {useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/signup_step3.css";

const SignupStep3 = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    const birth = params.get("birth");

    const [gender, setGender] = useState("");
    const [isGenderEmpty, setIsGenderEmpty] = useState(false);

    useEffect(() =>{
        console.log(gender);
        setIsGenderEmpty(gender === "");
    }, [gender]);

    return(
        <>  
            <div className="login_container">
                <header>
                    <span>🙏</span>
                    <p>50대 이상인지 확인할게요!</p>
                </header>
                <form action="SignupStep4" post="get">
                    <div className="input-group">
                        <label>성별</label>
                        <div className="gender-group" onClick={(e) => setGender(e.target.value)}>
                            <label>
                                <input type="radio" value="male" name="gender"/>
                                <span className="checkbox-custom" id="gender-male" ></span> 남성
                            </label>
                            <label>
                                <input type="radio" value="female" name="gender"/> 
                                <span className="checkbox-custom" id="gender-female" ></span> 여성
                            </label>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>생년월일</label>
                        <input type="number" id="birth" name="birth" value={birth} placeholder="생년월일 8자리"  readOnly/>
                    </div>
                    <div className="input-group">
                        <label>이름</label>
                        <input type="text" id="name" name="name" value = {name} placeholder="이름을 입력해주세요!" readOnly/>
                    </div>
                    <button type="submit" id="next-btn" className={isGenderEmpty ? "disabled" : ""} disabled={isGenderEmpty}>다음</button>
                </form>
            </div>
        </>
    );
}

export default SignupStep3;