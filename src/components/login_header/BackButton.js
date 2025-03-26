import React from "react";

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
            <img src="/images/headerImg.png" onClick={handleBack}></img>
        </>
    );
};

export default BackButton;