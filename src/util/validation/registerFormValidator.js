import isValidEmail from "./emailValidator";

const registerFormValidator = values => {
    let errors = {};

    if (!values.firstName.trim()) {
        errors.firstName = "First Name required";
    }

    if (!values.lastName.trim()) {
        errors.lastName = "Last Name required";
    }

    if (!isValidEmail(values.email)) {
        errors.email = "E-mail is invalid";
    }

    if (!values.password) {
        errors.password = "Password required";
    } else if (values.password.length < 3 || values.password.length > 20) {
        errors.password = "The size must be 3-20 chars";
    }

    return errors;
}

export default registerFormValidator;