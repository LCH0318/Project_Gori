import React from "react";
import LogoImage from "../home_header/LogoImage";
import Alarm from "../home_header/Alarm";

const HomeHeader = () => {
    return(
        <div style={styles.container}>
            <LogoImage/>
            <Alarm/>
        </div>
    );
}

const styles={
    container:{
        display:"flex",
        padding: "20px 10px",
    }
}
export default HomeHeader;