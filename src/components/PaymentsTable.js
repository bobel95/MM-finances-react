import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {formatEnumString} from "../util/stringUtils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const mainContainerStyle = {
    width: "50%",
    margin: "1rem auto",
    height: "100%",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 2rem 0 2rem",
    boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.55)",
}

const PaymentsTable = (props) => {

    const payments = props.payments;
    const [rows, setRows] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([...payments]);
    const [category, setCategory] = useState("All");


    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'category', headerName: 'Category', width: 280 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'currency', headerName: 'Currency', width: 150 },
    ];

    const createData = (id, date, category, amount, currency) => {
        return {id, date, category, amount, currency};
    }

    const createRows = () => {
        setRows(filteredPayments.map(p =>
            createData(
                p.id,
                p.date,
                formatEnumString(p.paymentCategory),
                p.money.amount,
                p.money.currency
            )));
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    useEffect(() => {
        setFilteredPayments(
            category !== "All"
                ? payments.filter(p => p.paymentCategory === category)
                : payments
        );
    }, [category]);


    useEffect(createRows, [filteredPayments]);

    return (
        <div style={mainContainerStyle}>
            <form>
                <FormControl
                    // className={classes.formControl}
                    // fullWidth
                >
                    <InputLabel>Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleCategoryChange}
                        value={category}
                        required
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        {payments
                            .map(p => p.paymentCategory)
                            .filter((category, idx, self) => self.indexOf(category) === idx)
                            .map((category, idx) =>
                            (<MenuItem value={category} key={idx}>
                                {formatEnumString(category)}
                            </MenuItem>)
                        )}

                    </Select>
                </FormControl>
            </form>

            <div style={{ height: 400, width: '100%'}}>
                <DataGrid rows={rows} columns={columns} pageSize={5} />
            </div>
        </div>
    );
}

export default PaymentsTable;
