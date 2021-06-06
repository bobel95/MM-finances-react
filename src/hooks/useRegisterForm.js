import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {register} from "../api/appUser";
import registerFormValidator from "../util/validation/registerFormValidator";

const useRegisterForm = () => {

    const history = useHistory();

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(registerFormValidator(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting && Object.keys(errors).length === 0) {
            register(values.firstName, values.lastName, values.email, values.password)
                .then(res => {
                    console.log(res.status)
                    if (res.status === 200) {
                        toast.success(
                            "Successfully Registered",
                            {
                                position: "bottom-center"
                            }
                        )
                        history.push("/login");
                    }
                }, () => {
                    setErrors({email: "E-mail is already taken"})
                });
        }
    }, [errors, isSubmitting]);

    return { values, handleChange, handleSubmit, errors };
};

export default useRegisterForm;