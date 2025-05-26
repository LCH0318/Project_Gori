import React from "react";
// import styles from "../login_header/backButton.module.css";

const BackButton = ({ isOpen }) => {
    const handleBack = () => {
        if (isOpen) {
            isOpen();
        } else {
            window.history.back();
        }
    }

    return (
        <>
            <img
                style={style.container}
                src="/images/headerImg.png" onClick={handleBack}></img>
        </>
    );
};

const style = {
    container: {
        position: "absolute",
        left: "0",
        top: "0",
        margin: "20px 10px"
    }
}

export default BackButton;