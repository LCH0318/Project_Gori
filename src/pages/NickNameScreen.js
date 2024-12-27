import React, {useEffect,useState} from "react";
import Header from "../components/login_header/Header";
import styles from "../css/NickName.module.css";
import BackButton from "../components/login_header/BackButton";
import SetupLaterBtn from "../components/login_header/SetupLaterBtn";

const NickNameScreen = () =>{
    const [nickName,setNickName] = useState("");
    const [defaultNickname, setDefaultNickname] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const nicknameRegExp = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]+$/;

    useEffect(() => {
        setDefaultNickname("섬세한코스모스");
    }, []);

    const handleNickname = () => {
        const messageList = [];
        if (nickName !== '') {
            if (nickName.length < 2 || nickName.length > 8) {
                messageList.push("최소 2글자 최대 8글자로 입력해주세요");
            }
            if (!nicknameRegExp.test(nickName)) {
                messageList.push("한글,영어,숫자만 입력 가능해요.");
            }
        }
        if (messageList) {
            setErrorMessage(messageList.join("\n"));
        } else {
            // 서버 통신
        }
    }

    function clearBtton() {
        setNickName("");
        setErrorMessage("");        
    }

    const handleBack = () => {
        alert("임시로 하는 back button event");
    }


    return(
        <div>
            <Header onBack={handleBack} leftComponent={<BackButton/>} rightComponent={<SetupLaterBtn/>}/>
            <div className={styles["container"]}>
                <img src="/images/eye.png"></img>
                {!nickName && <div>이런 닉네임은 어떠세요?<br/> 바꾸시려면 자판을 눌러주세요</div>}
                {nickName && <div>2~8글자 한글,영어,숫자만<br/> 입력 가능해요</div>}
                <div className={styles["input-group"]}>
                    <input placeholder={defaultNickname} onInput={(e) => setNickName(e.target.value)} value={nickName}/>  
                    {nickName && <button className={styles["clearBtn"]} onClick={() => clearBtton()}><img src="/images/clearBtn.png"></img></button>}
                    <div className={styles["red"]}>{errorMessage}</div>
                </div>
            </div>
            <div className={styles["completeBtn"]}>
                <button onClick={handleNickname} className={`${nickName ? styles["active"] : ""}`}>완료</button>
            </div>
        </div>
    );
}

export default NickNameScreen;