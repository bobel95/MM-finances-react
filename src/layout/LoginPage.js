import React from 'react';
import SignIn from "../components/SignIn";
import Header from "./Header";

const LoginPage = () => {
    return (
        <React.Fragment>
            <Header/>
            <SignIn/>
        </React.Fragment>
    );
};

export default LoginPage;
