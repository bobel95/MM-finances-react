import React from 'react';
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";
import {makeStyles} from "@material-ui/core/styles";
import useIncomeForm from "../hooks/useIncomeForm";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "green",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    message: {
        fontWeight: "200",
        textAlign: "center",
        backgroundColor: "#b7fab3",
        padding: ".25rem",
        margin: ".5rem",
        border: "1px solid",
        borderColor: "#18b300",
        borderRadius: ".5rem",
        width: "80%",
        color: "green",
    }
}));

const IncomeForm = () => {

    const { values, handleChange, handleSubmit, errors } = useIncomeForm();

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add monthly income
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
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.submit}
                    >
                        Add Income
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default IncomeForm;
