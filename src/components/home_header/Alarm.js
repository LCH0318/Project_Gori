import React from "react";

const Alarm = () =>{
    return(
        <div style={styles.container}>
            <img src="/images/alarm.png"></img>
        </div>
    );

}

const styles={
    container:{
        display: "flex",
        alignItems: "center",
        marginLeft: "150px",
    }
}

export default Alarm;