import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
            console.log("in useEffect");

            // Axios POST on the "/authenticate" endpoint of the api
            // The server checks if the credentials (email & password) are valid
            // And returns the JWT token, the user's name and ID
            axios
                .post("http://localhost:8080/authenticate", {
                    username: values.email,
                    password: values.password,
                })
                .then((res) => {
                    console.log(res.data);

                    // Store user info and the token in localStorage
                    window.localStorage.setItem("userName", res.data.username);
                    window.localStorage.setItem("userId", res.data.userId);

                    window.localStorage.setItem("token", res.data.jwt);

                    // Store a flag that lets us know the user has been logged in
                    window.localStorage.setItem("isLogged", true);

                    history.push(from.pathname);
                    console.log(from.pathname);
                    // window.location.reload();
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