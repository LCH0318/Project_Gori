import React from "react";

const LogoImage = () => {
    return (
        <div style={styles.container}>
            <img src="/images/logo.png" style={styles.image}></img>
            <img src="/images/GoryText.png" style={styles.text}></img>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        position: "absolute",
    },

    image: {
        position: "absolute",
        left: "-10px",
        width: "50px",
        height: "44px",
    },
    text: {
        width: "60px",
        position: "relative",
        top: "4px",
        left: "25px",
    }
}

export default LogoImage;