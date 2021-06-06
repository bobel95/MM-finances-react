import React from 'react';
import SignIn from "../components/SignIn";
import Header from "./Header";
import Footer from "./Footer";

const LoginPage = () => {
    return (
        <React.Fragment>
            <Header/>
            <SignIn/>
            <Footer/>
        </React.Fragment>
    );
};

export default LoginPage;
