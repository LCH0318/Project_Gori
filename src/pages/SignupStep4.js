import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/signup_step4.css";

const SignupStep4 = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    const birth = params.get('birth');
    const gender = params.get('gender');

    const bottomSheet = document.querySelector("#bottomSheet");   

    return(
        <>
            <div className="login_container">
                <header>
                    <span>🙏</span>
                    <p>50대 이상인지 확인할게요!</p>
                </header> 
                <form>
                    <div className="input-group" id="phone">
                        <label>휴대폰번호</label>
                        <input type="phone" maxlength="11" name="phoneNumber" id="input_number" placeholder="휴대폰 번호를 입력해주세요!" oninput="phonenumber()"/>
                    </div>

                    <div className="call-group">
                        <button type = "button" id="openSheetBtn" onClick={() => bottomSheet.classList.add('active')}>어디 통신사를 쓰시나요? <img id="disabled_btn" className="hidden "src="../../images/edit_24px.png"/></button>  
                        <input type="text" id="hidden" name = "phone_call"/>
                    </div>

                    <div className="input-group">
                        <label>성별</label>
                        <div className="gender-group">
                            <label>
                                <input type="radio" value="male" name="gender" id="male" checked = {gender == 'male'} readOnly/>
                                <span className="checkbox-custom" id="gender-male" ></span> 남성
                            </label>
                            <label>
                                <input type="radio" value="female" name="gender" id="female" checked = {gender == 'female'} readOnly/>  
                                <span className="checkbox-custom" id="gender-female" ></span> 여성
                            </label>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>생년월일</label>
                        <input type="number" id="birth" name="birth" value = {birth} placeholder="생년월일 8자리"  readOnly/>
                    </div>

                    <div className="input-group">
                        <label>이름</label>
                        <input type="text" id="name" name="name" value={name} placeholder="이름을 입력해주세요!" readOnly/>
                    </div>
                    <button type="submit" id="next-btn" className="disabled" disabled>다음</button>
                </form>

                <div id="bottomSheet" className="bottom-sheet">
                    <div className="bottomSheet-content"></div>
                        <div className="handle"></div>
                            <ul>
                                <li>SKT</li>
                                <li>KT</li>
                                <li>LG U+</li>
                                <li>SKT 알뜰폰</li>
                                <li>KT 알뜰폰</li>
                                <li>LG U+ 알뜰폰</li>
                            </ul>
                </div>  
            </div>  
        </>
    );
}

export default SignupStep4;