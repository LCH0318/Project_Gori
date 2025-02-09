import React from "react";

const Alarm = () => {
    return (
        <div style={styles.container}>
            <img src="/images/alarm.png"></img>
        </div>
    );

}

const styles = {
    container: {
        display: "flex",
        position: "absolute",
        top: "25px",
        alignItems: "center",
        right: "10px",
    }
}

export default Alarm;