import React from "react";

const BackButton = ({onBack}) =>{
    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    }

    return(
        <>
            <img src="/images/headerImg.png" onClick={handleBack}></img>
        </>
    );
};

export default BackButton;