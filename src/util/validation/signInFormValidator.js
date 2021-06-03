import isValidEmail from "./emailValidator";

const signInFormValidator = values => {
    let errors = {};

    // E-mail validation
    if (!values.email) {
        errors.email = "E-mail required";
    } else if (!isValidEmail(values.email)) {
        errors.email = "E-mail is invalid";
    }

    // Password validation
    if (!values.password) {
        errors.password = "Password required";
    } else if (values.password.length < 3) {
        errors.password = "Password should be longer than 3 characters";
    }

    return errors;
}

export default signInFormValidator;