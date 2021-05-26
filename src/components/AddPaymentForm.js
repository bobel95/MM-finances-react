import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Copyright from './Copyright';
import axios from "axios";


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

export default function AddPaymentForm() {
    const classes = useStyles();

    const [category, setCategory] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = () => {

        const dateString = getDateString();
        axios
            .post(`http://localhost:8080/api/payment/${window.localStorage.getItem("userId")}`,
                {
                    date: dateString,
                    paymentCategory: category,
                    money: {
                        amount: amount,
                        currency: "RON"
                    }
                })
            .then(res => {
                console.log(res);
                setMessage("Payment added");
            })
    }


    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const getDateString = () => {
        let date = new Date();

        return [
            date.getFullYear(),
            padWith0(date.getMonth() + 1),
            padWith0(date.getDate())
        ].join("-");
    }

    const padWith0 = (date) => {
        if (date.toString().length === 1) {
            return `0${date}`;
        }
        return date;
    }

    const messageContainer = message ?
        (<div className={classes.message}>
            <Typography variant="subtitle1">{message}</Typography>
        </div>)
        : "";


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add new spending
                </Typography>
                {messageContainer}
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="amount"
                        label="Amount (RON)"
                        name="amount"
                        autoFocus
                        onChange={handleAmountChange}
                        value={amount}
                    />
                    <FormControl
                        className={classes.formControl}
                        fullWidth
                    >
                        <InputLabel>Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleCategoryChange}
                            value={category}
                            required
                        >
                            <MenuItem value={"FOOD"}>Food</MenuItem>
                            <MenuItem value={"ALCOHOLIC_DRINKS"}>Alcoholic Drinks</MenuItem>
                            <MenuItem value={"NON_ALCOHOLIC_DRINKS"}>Non alcoholic drinks</MenuItem>
                            <MenuItem value={"TOBACCO"}>Tobacco</MenuItem>
                            <MenuItem value={"CLOTHING"}>Clothing</MenuItem>
                            <MenuItem value={"TRANSPORTATION"}>Transportation</MenuItem>
                            <MenuItem value={"TOOLS"}>Tools</MenuItem>
                            <MenuItem value={"PETS"}>Pets</MenuItem>
                            <MenuItem value={"UTILITIES"}>Utilities</MenuItem>
                            <MenuItem value={"INVESTMENTS"}>Investments</MenuItem>
                            <MenuItem value={"OTHERS"}>Others</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Add Payment
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}