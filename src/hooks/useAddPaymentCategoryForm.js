import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import paymentCategoryValidator from "../util/validation/paymentCategoryValidator";
import {addPaymentCategory} from "../api/paymentCategories";

const useSignInForm = () => {
    const [values, setValues] = useState({
        category: ""
    });

    const [errors, setErrors] = useState({ message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(paymentCategoryValidator(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting && Object.keys(errors).length === 0) {
            addPaymentCategory(values.category)
                .then(() => {
                    toast.success(
                        "Category added!",
                        {
                            position: "bottom-center"
                        }
                    );
                    window.location.reload();

                })
                .catch(() => {
                    toast.error(
                        "Category already exists!",
                        {
                            position: "bottom-center"
                        }
                    )
                });
        }
    }, [errors, isSubmitting]);

    return { values, handleChange, handleSubmit, errors };
};



export default useSignInForm;