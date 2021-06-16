import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import AddIncomeForm from "../components/AddIncomeForm";

const AddIncomePage = () => {
    return (
        <div>
            <Header/>
            <AddIncomeForm/>
            <Footer/>
        </div>
    );
};

export default AddIncomePage;
