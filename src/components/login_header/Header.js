import React, { useState } from "react";
import SetupLaterBtn from "./SetupLaterBtn";
import BackButton from "./BackButton";

const Header = ({ isOpen, title, isClose }) => {
    return (
        <div style={style.container}>
            <BackButton isOpen={true} />
            <div>{title}</div>
            <SetupLaterBtn isClose={false} />
        </div>
    );
}

const style = {
    container: {
        width: "calc(100vw - 40px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px"
    },
    left: {
        flex: "0 0 auto",
    },
    right: {
        flex: "0 0 auto",
    }
}

export default Header;