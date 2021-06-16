import React, {useEffect, useState} from "react";
import { DataGrid } from "@material-ui/data-grid";
import {formatEnumString} from "../util/stringUtils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Button, TextField} from "@material-ui/core";


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

const filtersContainerStyle = {
    backgroundColor: "#e3e3e3",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "2px solid black",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem"
}

const PaymentsTable = (props) => {

    const payments = props.payments;
    const [rows, setRows] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([...payments]);
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        setFilteredPayments(payments)
    }, [payments]);

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
        const datesAreSelected = startDate != null && endDate != null;
        const dateFilteredPayments =  datesAreSelected
            ? payments.filter(p => {
                return startDate < new Date(p.date) && new Date(p.date) < endDate
            })
            : [...payments];

        const categoryIsSelected = category !== "";
        const categoryFilteredPayments = categoryIsSelected
            ? dateFilteredPayments.filter(p => p.paymentCategory === category)
            : [...dateFilteredPayments];

        setFilteredPayments(categoryFilteredPayments);
    }, [category, startDate, endDate]);

    useEffect(createRows, [filteredPayments]);


    const resetFilters = () => {
        setCategory("");
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <div style={mainContainerStyle}>
            <div style={filtersContainerStyle}>
                <div>
                    <FormControl
                        style={{width: "200px"}}
                    >
                        <InputLabel>Category</InputLabel>
                        <Select
                            onChange={handleCategoryChange}
                            value={category}
                        >
                            <MenuItem value={""}>All</MenuItem>
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
                </div>

                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd-MM-yyyy"
                        customInput={<TextField label="Start Date"/>}
                    />
                </div>

                <div>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd-MM-yyyy"
                        customInput={<TextField label="End Date"/>}

                    />
                </div>

                <Button
                    style={{textTransform: "none"}}
                    onClick={resetFilters}
                    variant="outlined"
                    >
                    Reset Filters
                </Button>
            </div>

            <div style={{ height: 400, width: '100%'}}>
                <DataGrid rows={rows} columns={columns} pageSize={5} />
            </div>
        </div>
    );
}

export default PaymentsTable;
