import React from "react";
// import SetupLaterBtn from "./SetupLaterBtn";
// import BackButton from "./BackButton";

const Header = ({onBack, leftComponent, rightComponent}) => {
    return(
        <div style={style.container}>
            <div style={style.left}>
                {leftComponent}
            </div>
            <div style={style.right}>
                {rightComponent}
            </div>
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