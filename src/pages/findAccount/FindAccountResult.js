import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../../css/findAccount/FindAccountResult.module.css"
import axios from "axios";

const FindAccountResult = () => {
    const { token } = useParams();

    const [providerType, setProviderType] = useState("");

    const providers = {
        "KAKAO": { button: "kakao_btn", name: "카카오" },
        "GOOGLE": { button: "google_btn", name: "구글" },
    };

    const fetchUserLoginInfo = async () => {
        try {
            const response = await axios.post("https://gory.seojongchan-dev.com/auth/findAccount/getInfo", {
                token,
            });
            setProviderType(response.data.providerType);
        } catch (error) {
            setProviderType("KAKAO");
            // alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    }

    useEffect(() => {
        fetchUserLoginInfo();
    }, []);

    return (<>
        <div className={styles["container"]}>
            <p>
                입력하신 이메일로 찾은 계정이에요
            </p>
            <div className={styles["social-login-list"]}>
                {providerType && providers[providerType] && (
                    <div className={styles["social-login-item"]}>
                        <img src={`/images/${providers[providerType].button}.png`} />
                        <span>{providers[providerType].name}</span>
                        <button>로그인하기</button>
                    </div>
                )}
                {/* {providerType === "KAKAO" && (<div className={styles["social-login-item"]}>
                <img src="/images/kakao_btn.png"/>
                <span>카카오</span>
                <button>로그인하기</button>
            </div>)}
            {providerType === "GOOGLE" && (<div className={styles["social-login-item"]}>
                <img src="/images/google_btn.png"/>
                <span>구글</span>
                <button>로그인하기</button>
            </div>)} */}
            </div>
        </div>
    </>);
}

export default FindAccountResult;