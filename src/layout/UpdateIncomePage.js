import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import UpdateIncomeForm from "../components/UpdateIncomeForm";

const UpdateIncomePage = () => {
    return (
        <div>
            <Header/>
            <UpdateIncomeForm/>
            <Footer/>
        </div>
    );
};

export default UpdateIncomePage;
