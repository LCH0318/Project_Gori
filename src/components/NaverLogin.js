import React from "react"

const NaverLogin = () => {
    const NAVER_CLIENT_ID = "MMPGm2nDUSCg0NuZ9QZ1";
    const REDIRECT_URI = "http://localhost:3000/auth/signin/naver";
    const STATE = "false";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

    const handleLogin = () => {
        window.location.href = NAVER_AUTH_URL;
    };

    return (
        <button type="button" onClick={() => handleLogin()} className="naver">네이버 로그인</button>
    );
};

export default NaverLogin;