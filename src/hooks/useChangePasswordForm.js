import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {changePass} from "../api/appUser";

const useChangePasswordForm = () => {
    const history = useHistory();

    const [values, setValues] = useState({
        previousPassword: "",
        newPassword: "",
    });

    const [errors, setErrors] = useState({ message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        console.log(values);

        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting) {
            changePass(values.previousPassword, values.newPassword, window.localStorage.getItem("userId"))
                .then((res) => {
                    console.log("se schimba");
                    // history.push(from.pathname);
                })
                .catch(() => {
                    setErrors({ message: "Actual password incorrect" });
                    setIsSubmitting(false);
                });
        }
    }, [isSubmitting]);

    return { values, handleChange, handleSubmit, errors };
};


export default useChangePasswordForm;
