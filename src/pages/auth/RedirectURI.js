import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const RedirectURI = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        let code = new URL(window.location.href).searchParams.get("code");
        console.log(code);    
    })
};

export default RedirectURI;