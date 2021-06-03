import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signIn } from "../api/appUser";

const useSignInForm = (from) => {
    const history = useHistory();

    const [values, setValues] = useState({
        email: "",
        password: "",
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
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting) {
            signIn(values.email, values.password)
                .then((res) => {

                    // Store user info and the token in localStorage (for testing purposes)
                    window.localStorage.setItem("userName", res.data.username);
                    window.localStorage.setItem("userId", res.data.userId);
                    window.localStorage.setItem("token", res.data.jwt);
                    window.localStorage.setItem("isLogged", true);

                    history.push(from.pathname);
                })
                .catch(() => {
                    setErrors({ message: "Invalid email/password" });
                    setIsSubmitting(false);
                });
        }
    }, [isSubmitting]);

    return { values, handleChange, handleSubmit, errors };
};

export default useSignInForm;