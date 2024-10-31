import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import "../css/signup_step5.css";

const SignupStep5 = () => {
    return(
        <>
            <div class="login_container">
            <header>
                <span>🙏</span>
                <p>작성해주셔서 감사합니다! <br/>다음 버튼을 눌러주세요!</p>
            </header> 
            <form>
                <div class="input-group" id="phone">
                    <label>휴대폰번호</label>
                    <input type="phone" maxlength="11" id="input_number" placeholder="휴대폰 번호를 입력해주세요!" oninput="phonenumber()" readonly>
                </div>

                <div class="call-group">
                    <button id="openSheetBtn" onclick="return false;">어디 통신사를 쓰시나요? <img id="disabled_btn" class="hidden "src="../../images/edit_24px.png"/></button>  
                </div>

                <div class="input-group">
                    <label>성별</label>
                    <div class="gender-group">
                        <label>
                            <input type="radio" value="male" name="gender" id="male">
                            <span class="checkbox-custom" id="gender-male" ></span> 남성
                        </label>
                        <label>
                            <input type="radio" value="female" name="gender" id="female">
                            <span class="checkbox-custom" id="gender-female" ></span> 여성
                        </label>
                    </div>
                </div>

                <div class="input-group">
                    <label>생년월일</label>
                    <input type="number" id="birth" name="birth" placeholder="생년월일 8자리"  readonly>
                </div>

                <div class="input-group">
                    <label>이름</label>
                    <input type="text" id="name" name="name" placeholder="이름을 입력해주세요!" readonly>
                </div>
                <button type="button" id="next-btn" value="다음">다음</button>
                
                <div id="tost_message">
                    고리는 50세 이상부터 가입하실 수 있어요
                </div>
                
            </form>

            <div id="bottomSheet" class="bottom-sheet">
                <div class="bottomSheet-content"></div>
                    <div class="handle">
                    </div>
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