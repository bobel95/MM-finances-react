import React, {useEffect, useState} from "react";
import {DataGrid} from "@material-ui/data-grid";
import {formatEnumString} from "../util/stringUtils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Button, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CountUp from "react-countup";

const mainContainerStyle = {
    width: "60%",
    margin: "1rem auto 120px",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 2rem 0 2rem",
    boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.55)",
}

const filtersContainerStyle = {
    backgroundColor: "#7cdb7a",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "1rem",
    borderBottom: "2px solid #AAA",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem"
}

const totalContainerStyle = {
    borderTop: "2px solid #AAA",
    borderBottomLeftRadius: "1rem",
    borderBottomRightRadius: "1rem",
    backgroundColor: "#7cdb7a",
    paddingTop: ".5rem",
    width: "100%",
    margin: "0 auto 1rem",
}

const PaymentsTable = (props) => {

    const payments = props.payments;
    const [rows, setRows] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([...payments]);
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [groupByProperty, setGroupByProperty] = useState("");

    useEffect(() => {
        setFilteredPayments(payments)
    }, [payments]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'category', headerName: 'Category', width: 300 },
        { field: 'amount', headerName: 'Amount', width: 200 },
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
                (p.money.amount).toFixed(2),
                p.money.currency
            )));
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleGroupByPropertyChange = (e) => {
        setGroupByProperty(e.target.value);
    }

    useEffect(() => {
        setFilteredPayments(payments);

        const datesAreSelected = startDate != null || endDate != null;
        const dateFilteredPayments =  datesAreSelected
            ? payments.filter(p => {
                const paymentDate = new Date(p.date);
                if (startDate === null) {
                    return  paymentDate < endDate;
                } else if (endDate === null) {
                    return startDate < paymentDate;
                } else {
                    return startDate < paymentDate && paymentDate < endDate;
                }
            })
            : [...payments];

        const categoryIsSelected = category !== "";
        const categoryFilteredPayments = categoryIsSelected
            ? dateFilteredPayments.filter(p => p.paymentCategory === category)
            : [...dateFilteredPayments];

        const groupedPayments = groupByProperty !== ""
            ? groupBy(categoryFilteredPayments, groupByProperty)
            : [...categoryFilteredPayments];

        setFilteredPayments(groupedPayments);

    }, [category, startDate, endDate, groupByProperty]);

    useEffect(createRows, [filteredPayments]);


    const groupBy = (paymentsList, value) => {

        let customCategory = null;
        let customDate = null;

        if (value === "date") {
            customCategory = "Multiple";
        } else if (value === "paymentCategory") {
            customDate = "Multiple";
        }

        return [...paymentsList].reduce(
            (prev, p) => {
                let i;
                let flag = false;
                for (i = 0; i < prev.length; i++) {
                    if (prev[i][value] === p[value]) {
                        flag = true;
                        break;
                    }
                }

                flag
                    ? prev[i] = {
                        id: p.id,
                        date: customDate ? customDate : p.date,
                        paymentCategory: customCategory ? customCategory: p.paymentCategory,
                        money: {
                            amount: (prev[i].money.amount + p.money.amount),
                            currency: "RON"
                        }
                    }
                    : prev.push(p);

                return prev;
            }
        , []);
    }


    const resetFilters = () => {
        setCategory("");
        setStartDate(null);
        setEndDate(null);
        setGroupByProperty("");
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
                        customInput={<TextField label="Start Date" />}
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

                <FormControl
                    style={{width: "200px"}}
                >
                    <InputLabel>Group By</InputLabel>
                    <Select
                        onChange={handleGroupByPropertyChange}
                        value={groupByProperty}
                    >
                        <MenuItem value={""}>None</MenuItem>
                        <MenuItem value={"paymentCategory"}>Category</MenuItem>
                        <MenuItem value={"date"}>Date</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    style={{
                        textTransform: "none",
                        color: "#891111",
                    }}
                    onClick={resetFilters}
                    variant={"text"}
                    >
                    Reset Filters
                </Button>
            </div>

            <div style={{ height: 400, width: '100%'}}>
                <DataGrid rows={rows} columns={columns} pageSize={5} />
            </div>

            <div style={totalContainerStyle}>
                <Typography variant="h6" gutterBottom>
                    <CountUp
                        start={0}
                        end={filteredPayments.reduce((prev, p) => p.money.amount + prev, 0)}
                        decimals={2}
                        duration={1.5}
                        prefix={"Total spent: "}
                        suffix={" RON"}
                    />
                </Typography>
            </div>
        </div>
    );
}

export default PaymentsTable;
