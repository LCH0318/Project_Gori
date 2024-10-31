import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/signup_step1.css";

const SignupStep1 = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const email = params.get("e");
    const provider = params.get("prov");
    const providerId = params.get("provId");

    const [name, setName] = useState("");
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    
    useEffect(() => {
        // console.log(email, provider, providerId);
        console.log(name);
        setIsNameEmpty(name === "");
    }, [name]);

    return (
        <>
            <div className="login_container">
                <header>
                    <span>🙏</span>
                    <p>50대 이상인지 확인할게요!</p>
                </header>
                <form action="SignupStep2" method="get">
                    <div className="input-group">
                        <label>이름</label>
                        <input type="text" id="name" name='name' placeholder="이름을 입력해주세요!" value={name} onChange={(e) => setName(e.target.value)}/>
                        <button type="button" id="clear-btn" className={isNameEmpty ? "hidden" : ""} onClick={() => setName("")}>X</button>
                    </div>
                    <button type="submit" id="next-btn" className={isNameEmpty ? "disabled" : ""} disabled={isNameEmpty}>다음</button>
                </form>
            </div>
        </>
    );
}

export default SignupStep1;