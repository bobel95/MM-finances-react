import useIncomeForm from "../hooks/useIncomeForm";
import {useFormStyles} from "../util/styleUtils";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";
import React from "react";
import {useLocation} from "react-router-dom";

const UpdateIncomeForm = () => {
    const location = useLocation();
    const { data } = location.state;

    const { values, handleChange, handleSubmit, errors }
        = useIncomeForm(true, data);

    const classes = useFormStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Update your monthly income
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="amount"
                        label="Amount (RON)"
                        name="amount"
                        autoFocus
                        onChange={handleChange}
                        value={values.amount}
                        error={errors.amount}
                        helperText={errors.amount}
                        placeholder={data.amount}
                    />

                    <TextField
                        type="number"
                        InputProps={{
                            inputProps: {
                                max: 30,
                                min: 1,
                            }
                        }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="date"
                        label="Income Date (1-30)"
                        name="date"
                        autoFocus
                        onChange={handleChange}
                        value={values.date}
                        error={errors.date}
                        helperText={errors.date}
                        placeholder={data.date}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.submit}
                    >
                        Update Income
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default UpdateIncomeForm;
