
const incomeFormValidator = values => {
    let errors = {};

    if (!values.amount) {
        errors.amount = "Amount required";
    }

    if (values.amount < 1) {
        errors.amount = "Amount must be higher than 0";
    }

    if (!values.date) {
        errors.date = "Date required";
    }

    if (values.date < 1 || values.date > 30) {
        errors.date = "Date must be between 1 and 30";
    }

    return errors;
}

export default incomeFormValidator;