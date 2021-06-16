import React from 'react';
import AccountDetails from "../components/AccountDetails";
import Header from "./Header";
import Footer from "./Footer";
import {Typography} from "@material-ui/core";
import IncomeData from "../components/IncomeData";

const MyAccountPage = () => {

    const contentContainerStyle = {
        width: "60%",
        margin: "120px auto 120px auto",
        height: "100%",
        borderRadius: "1rem",
        display: "flex",
        padding: "2rem",
        boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.55)",
    }

    return (
        <div>
            <Header/>
            <div style={contentContainerStyle}>
                <AccountDetails/>
            </div>
            <Footer/>
        </div>
    );
};

export default MyAccountPage;
