import React from "react";

const LogoImage = () =>{
    return(
        <div style={styles.container}>
            <img src="/images/logo.png" style={styles.image}></img>
            <img src="/images/GoryText.png" style={styles.text}></img>
        </div>
    );  
}

const styles={
    container:{
        display: "flex",
        alignItems: "center",
    },
    image:{
        width: "50px",
        height: "44px",
    },
    text:{
        width: "60px",
        position: "relative",
        top: "4px",
        right: "15px",
    }
}

export default LogoImage;