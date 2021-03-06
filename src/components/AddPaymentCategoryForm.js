import React from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";
import {useFormStyles} from "../util/styleUtils";
import useAddPaymentCategoryForm from "../hooks/useAddPaymentCategoryForm";

const AddPaymentCategoryForm = (props) => {
    const classes = useFormStyles();

    const { values, handleChange, handleSubmit, errors } = useAddPaymentCategoryForm();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Add new category
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="category"
                        label="Category"
                        name="category"
                        autoFocus
                        onChange={handleChange}
                        value={values.category}
                        error={errors.category}
                        helperText={errors.category}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        style={{textTransform: "none"}}
                    >
                        Submit
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default AddPaymentCategoryForm;
