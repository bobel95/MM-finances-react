import React, {useState, useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {formatEnumString} from "../util/stringUtils";
import SimpleModal from "./SimpleModal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";
import {useFormStyles} from "../util/styleUtils";
import {addPaymentCategory} from "../api/paymentCategories";
import {toast} from "react-toastify";

const AddPaymentCategoryForm = (props) => {
    const { handleCloseModal } = props;
    const classes = useFormStyles();

    const [category, setCategory] = useState("");

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        console.log(category);
    }

    const handleSubmit = () => {
        // console.log("mere")
        addPaymentCategory(category)
            .then(() => {
                toast.success(
                    "Password changed!",
                    {
                        position: "bottom-center"
                    }
                )
            })
            .catch(() => {
                toast.error(
                    "Actual password incorrect",
                    {
                        position: "bottom-center"
                    }
                )
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Add new category
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="category"
                        label="Category"
                        name="category"
                        autoFocus
                        onChange={handleCategoryChange}
                        value={category}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Add Category
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
