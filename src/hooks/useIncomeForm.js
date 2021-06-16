import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import incomeFormValidator from "../util/validation/incomeFormValidator";
import {addIncome, updateIncome} from "../api/income";
import {useHistory} from "react-router-dom";

const useIncomeForm = (isUpdating, data) => {
    const [values, setValues] = useState({
        date: isUpdating ? data.date : "",
        amount: isUpdating ? data.amount: "",
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

    const submit = () => {
        if (isSubmitting && Object.keys(errors).length === 0) {
            addIncome(values.amount, values.date)
                .then(() => {
                    notifySuccess("Income added!");
                    history.push("/account");
                })
                .catch(() => {
                    notifyError()
                });
        }
    }

    const update = () => {
        if (isSubmitting && Object.keys(errors).length === 0) {
            updateIncome(values.amount, values.date, data.id)
                .then(() => {
                    notifySuccess("Income updated!");
                    history.push("/account");
                })
                .catch(() => {
                    notifyError();
                })
        }
    }

    useEffect(() => {
        isUpdating
            ? update()
            : submit()
    }, [errors, isSubmitting]);


    const notifySuccess = (text) => {
        toast.success(
            `${text}`,
            {
                position: "bottom-center"
            });
    }

    const notifyError = () => {
        toast.error(
            "Something went wrong :(",
            {
                position: "bottom-center"
            });
        setIsSubmitting(false);
    }

    return { values, handleChange, handleSubmit, errors };
};

export default useIncomeForm;