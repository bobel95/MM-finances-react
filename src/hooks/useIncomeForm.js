import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import incomeFormValidator from "../util/validation/incomeFormValidator";
import {addIncome} from "../api/income";
import {useHistory} from "react-router-dom";

const useIncomeForm = () => {

    const [values, setValues] = useState({
        date: "",
        amount: "",
    });
    const [errors, setErrors] = useState({ message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(incomeFormValidator(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting && Object.keys(errors).length === 0) {
            addIncome(values.amount, values.date)
                .then(() => {
                    toast.success(
                        "Income added!",
                        {
                            position: "bottom-center"
                        });
                    history.push("/account");
                })
                .catch(() => {
                    toast.error(
                        "Something went wrong :(",
                        {
                            position: "bottom-center"
                        });
                    setIsSubmitting(false);
                });
        }
    }, [errors, isSubmitting]);

    return { values, handleChange, handleSubmit, errors };
};



export default useIncomeForm;