
const changePasswordValidator = values => {
    let errors = {};

    if (!values.previousPassword) {
        errors.previousPassword = "Password required";
    } else if (values.previousPassword.length <= 3 || values.previousPassword.length > 20) {
        errors.previousPassword = "The length must be 3-20 chars";
    }

    if (!values.newPassword) {
        errors.newPassword = "Password required";
    } else if (values.newPassword.length <= 3 || values.newPassword.length > 20) {
        errors.newPassword = "The length must be 3-20 chars";
    }

    return errors;
}

export { changePasswordValidator };