import React from 'react';
import Header from "./Header";
import AddPaymentForm from "../components/AddPaymentForm";
import Footer from "./Footer";

const AddPaymentPage = () => {
    return (
        <div>
            <Header/>
            <AddPaymentForm/>
            <Footer/>
        </div>
    );
};

export default AddPaymentPage;
