import React from 'react';
import { Redirect } from "react-router-dom";


const Logout = () => {

    window.localStorage.clear();
    // toast.warn(
    //     "Logged Out",
    //     {
    //         position: "bottom-center"
    //     }
    // )
    return (
        <Redirect to={{
            pathname: "/",
            state: {loggedOut: true}
        }}
        />
    );
}

export default Logout;
