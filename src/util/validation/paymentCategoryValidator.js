
const paymentCategoryValidator = (values) => {
    let errors = {};

    if (!values.category) {
        errors.category = "Field required";
    }

    return errors;
}

export default paymentCategoryValidator;