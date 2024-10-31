import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import KakaoLogin from "react-kakao-login";
import NaverLogin from "../components/NaverLogin";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (provider, providerId, email) => {
        navigate(`/signup-step1?provId=${providerId}&prov=${provider}&e=${email}`);
    };

    const handleKakaoLogin = (response) => {
        const { profile } = response;
        const { kakao_account } = profile;
        handleLogin("KAKAO", profile.id, kakao_account.email);
    }

    const handleNaverLogin = (response) => {
        console.log(response);
        // const { profile } = response;
        // const { kakao_account } = profile;
        // handleLogin("KAKAO", profile.id, kakao_account.email);
    }

    return (
        <>
            <div className="login_container">
                <div className="logo">
                    <img src="/images/logo.png" alt = "404" id="logo" />
                </div>
                <div className="recent_login">
                    <p>이전에 가입한 적이 있으신가요?</p>
                </div>
                <div>
                    <KakaoLogin
                        token="35a0f5389bca2491dd0620ec24adade3"
                        onSuccess={handleKakaoLogin}
                        onFail={(error) => console.log(error)}
                        onLogout={() => alert("로그아웃 했습니다!")}
                    />
                    <NaverLogin />
                    {/* <NaverLogin
                        clientId="MMPGm2nDUSCg0NuZ9QZ1"
                        callbackUrl="http://localhost:3000/auth/signin/naver"
                        onSuccess={handleNaverLogin}
                        onFailure={(error) => console.log(error)}
                    /> */}
                    {/* <button type="button" onClick={() => handleLogin('KAKAO')} className="kakao">카카오 로그인</button> */}
                    {/* <button type="button" onClick={() => handleLogin('NAVER')} className="naver">네이버 로그인</button> */}
                    <button type="button" onClick={() => handleLogin('GOOGLE')} className="google">구글 로그인</button>
                    <button type="button" className="last_login">마지막 로그인</button>
                </div>  
            </div>
        </>
    );
}

export default Login;