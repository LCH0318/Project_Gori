import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../css/signup/SignupStep1.module.css";

const SignupStep1 = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const email = params.get("e") ?? "test@test.com";
    const provider = params.get("prov") ?? "KAKAO";
    const providerId = params.get("provId") ?? "1000100";

    const [name, setName] = useState("");
    const [isNameEmpty, setIsNameEmpty] = useState(false);

    useEffect(() => {
        // console.log(email, provider, providerId);
        console.log(name);
        setIsNameEmpty(name === "");
    }, [name]);

    return (
        <>
            <div className={styles["login_container"]}>
                <header>
                    <span>🙏</span>
                    <p>50대 이상인지 확인할게요!</p>
                </header>
                <form action="SignupStep2" method="get">
                    <div className={styles["input-group"]}>
                        <label>이름</label>
                        <input type="text" className={styles["name"]} name='name' placeholder="이름을 입력해주세요!" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>이메일</label>
                        <input type="text" className={styles["email"]} name='email' value={email} readOnly />
                        <button type="button" className={styles["clear-btn"]} hidden={isNameEmpty} onClick={() => setName("")}>X</button>
                    </div>
                    <button type="submit" className={styles["next-btn"]} disabled={isNameEmpty}>다음</button>
                </form>
            </div>
        </>
    );
}

export default SignupStep1;