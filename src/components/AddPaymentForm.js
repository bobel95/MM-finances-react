import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Copyright from './Copyright';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPayment } from "../api/payments";
import {formatEnumString, getDateString} from "../util/stringUtils";
import { useFormStyles } from "../util/styleUtils";
import {getCustomPaymentCategories} from "../api/paymentCategories";
import SimpleModal from "./SimpleModal";
import AddPaymentCategoryForm from "./AddPaymentCategoryForm";


export default function AddPaymentForm() {
    const classes = useFormStyles();

    const [customCategories, setCustomCategories] = useState([])
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryAdded, setCategoryAdded] = useState(false);

    useEffect(() => {
        getCustomPaymentCategories()
            .then(res => setCustomCategories(res.data));
    }, [categoryAdded]);


    const handleSubmit = () => {
        const userId = window.localStorage.getItem("userId");
        const dateString = getDateString(new Date());
        addPayment(userId, dateString, category, amount)
            .then(res => {
                toast.success(
                    "Successfully Added!",
                    {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
            })
            .catch(() => {
                toast.error(
                    "Something went wrong :(",
                    {
                        position: toast.POSITION.BOTTOM_CENTER
                    }
                )
            })
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add new spending
                </Typography>
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
                            <MenuItem value={"CLOTHING"}>Clothing</MenuItem>
                            <MenuItem value={"TRANSPORTATION"}>Transportation</MenuItem>
                            <MenuItem value={"TOOLS"}>Tools</MenuItem>
                            <MenuItem value={"UTILITIES"}>Utilities</MenuItem>
                            <MenuItem value={"INVESTMENTS"}>Investments</MenuItem>
                            {
                                customCategories && customCategories
                                    .map((c, i) =>
                                    <MenuItem key={i} value={c.category}>
                                        {formatEnumString(c.category)}
                                    </MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        paddingTop: "1rem"
                    }}>
                        <Typography variant="body2">
                            Can't find the category you're looking for?
                        </Typography>
                        <SimpleModal
                            content={<AddPaymentCategoryForm/>}
                        />
                    </div>


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