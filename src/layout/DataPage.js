import React, {useEffect, useState} from 'react';
import Header from "./Header";
import PaymentsTable from "../components/PaymentsTable";
import Typography from "@material-ui/core/Typography";
import PieGraph from "../components/PieGraph";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import ComparisonChart from "../components/ComparisonChart";
import { getUser } from "../api/appUser";


const DataPage = () => {

    const useStyles = makeStyles((theme) => ({
    }));

    const [payments, setPayments] = useState([]);
    const [dataType, setDataType] = useState("table");
    const [content, setContent] = useState(<PaymentsTable payments={payments}/>);
    const classes = useStyles();
    const userId = window.localStorage.getItem("userId");

    useEffect(() => {
        getUser(userId)
            .then(res => {
                setPayments(res.data.paymentList);
            });
    }, []);

    const handleChange = (event) => {
        setDataType(event.target.value);
    }

    const changeContent = () => {
        switch(dataType) {
            case "pie":
                setContent(<PieGraph payments={payments}/>);
                break;
            case "table":
                setContent(<PaymentsTable payments={payments}/>);
                break;
            case "line":
                setContent(<ComparisonChart payments={payments}/>);
                break;
            default:
                setContent(<PaymentsTable payments={payments}/>);
        }
    }

    useEffect(changeContent, [dataType, payments]);


    return (
        <div>
            <Header/>

            <div style={{marginTop: "120px", textAlign: "center", height: "500px"}}>

                <Typography variant="h4" gutterBottom>Your spendings</Typography>
                <FormControl
                    className={classes.formControl}

                >
                    <InputLabel>Data</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        onChange={handleChange}
                        value={dataType}
                        required
                    >
                        <MenuItem value={"table"}>All expenses</MenuItem>
                        <MenuItem value={"pie"}>By Category</MenuItem>
                        <MenuItem value={"line"}>Compare expenses</MenuItem>

                    </Select>
                </FormControl>
                {content}

            </div>

            <Footer/>
        </div>
    );
};

export default DataPage;
