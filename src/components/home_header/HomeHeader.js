import React from "react";
import LogoImage from "../home_header/LogoImage";
import Alarm from "../home_header/Alarm";

const HomeHeader = () => {
    return (
        <div style={styles.container}>
            <LogoImage />
            <Alarm />
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        padding: "20px 5px",
        height: "10px",
        width: "calc(100% - 10px)"
    }
}
export default HomeHeader;