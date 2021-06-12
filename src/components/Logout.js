import React from 'react';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';


const Logout = () => {

    window.localStorage.clear();
    toast.warn(
        "Logged Out",
        {
            position: "bottom-center"
        }
    )
    return (
        <Redirect to="/"/>
    );
};

export default Logout;
