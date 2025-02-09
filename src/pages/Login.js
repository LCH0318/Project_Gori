import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { jwtDecode } from "jwt-decode";
import styles from "../css/Login.module.css";
import KakaoLogin from "react-kakao-login";
// import axios from "axios";
import axios from "./utils/axiosInstance";
// import NaverLogin from "../components/NaverLogin";
// import LoginNaver from "react-naver-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAppContext } from "../contexts/AppContext";

const Login = () => {
    const { login } = useAppContext();

    const navigate = useNavigate();

    const handleLogin = (provider, providerId, email) => {
        navigate(`/SignupStep1?provId=${providerId}&prov=${provider}&e=${email}`);
    };

    const handleKakaoLogin = (response) => {
        const { profile } = response;
        const { kakao_account } = profile;
        authentication("KAKAO", profile.id, kakao_account.email);
    }

    const handleNaverLogin = (response) => {
        console.log(response);
        fetchNaverUserInfo(response.accessToken);
    }

    const fetchNaverUserInfo = (accessToken) => {
        fetch("https://openapi.naver.com/v1/nid/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) =>  res.json())
            .then((data) => {
                console.log("user : ", data.response);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleGoogleLogin = (response) => {
        const { email, sub } = jwtDecode(response.credential);
        authentication("Google", sub, email);        
    }

    const authentication = async (provider, providerId, email) => {
        const userData = { email, provider, providerId };
        try {
            const { data } = await axios.post("/auth/login", userData);
            login(data.token);
            navigate("/");
            // window.location.reload();
        } catch (error) {
            console.log(error);
            test();
            // handleLogin(provider, providerId, email);
        }
    }

    const test = () => {
        console.log(localStorage.getItem("token"))
        login("testtoken");
        navigate("/");
        // window.location.reload();
    }


    const findAcount = () =>{
        navigate("/FindAccount");
    }

    useEffect(() => {
        const bodyStyle = document.body.style.cssText;
        document.body.style.justifyContent = "center";
        return () => {
            document.body.style.cssText = bodyStyle;
        };
    });

    return (
        <>
            <div className="login_container">
                <div className="logo">
                    <img src="/images/logo.png" alt = "404" id="logo" />
                </div>
                <div className={styles["recent_login"]}>
                    <button onClick={() => findAcount()}><img src="/images/ic_alert.png"></img>이전에 가입한 적이 있으신가요?</button>
                </div>
                <div>
                    <KakaoLogin
                        token="35a0f5389bca2491dd0620ec24adade3"
                        onSuccess={handleKakaoLogin}
                        onFail={(error) => console.log(error)}
                        onLogout={() => alert("로그아웃 했습니다!")}
                    />
                    {/* <LoginNaver /> */}
                    {/* <LoginNaver
                        clientId="MMPGm2nDUSCg0NuZ9QZ1"
                        callbackUrl="http://localhost:3000/login"
                        onSuccess={handleNaverLogin}
                        onFailure={(error) => console.log(error)}
                        scope="profile"
                    /> */}
                    <GoogleOAuthProvider clientId="139458984456-i4r15ci99d13ln9c4ra6sl9hkfib6nmb.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={(response) => handleGoogleLogin(response)}
                            onError={(err) => console.log(err)}
                            scope="profile email id"
                        />
                    {/* <button type="button" className="last_login">마지막 로그인</button> */}
                    </GoogleOAuthProvider>
                    {/* <button type="button" onClick={() => handleLogin('KAKAO')} className="kakao">카카오 로그인</button> */}
                    {/* <button type="button" onClick={() => test()} className="naver">네이버 로그인</button> */}
                    {/* <button type="button" onClick={() => handleLogin('GOOGLE')} className="google">구글 로그인</button> */}
                    
                </div>  
            </div>
        </>
    );
}

export default Login;