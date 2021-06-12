import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {useHistory} from "react-router-dom";
import {changePass} from "../api/appUser";
import {changePasswordValidator} from "../util/validation/changePasswordValidator";

const useChangePasswordForm = (reloadCallback) => {
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
        setErrors(changePasswordValidator(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting && Object.keys(errors).length === 0) {
            changePass(values.previousPassword, values.newPassword, window.localStorage.getItem("userId"))
                .then((res) => {
                    toast.success(
                        "Password changed!",
                        {
                            position: "bottom-center"
                        }
                    )
                    reloadCallback();
                })
                .catch(() => {
                    toast.error(
                        "Actual password incorrect",
                        {
                            position: "bottom-center"
                        }
                    )
                    // setErrors(prev => prev.previousPassword = "Actual password incorrect");
                    setIsSubmitting(false);
                });
        }
    }, [isSubmitting, errors]);

    return { values, handleChange, handleSubmit, errors };
};


export default useChangePasswordForm;
