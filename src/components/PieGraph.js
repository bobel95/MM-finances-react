import React, { useState, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import {styled} from "@material-ui/core";
import CustomActivePieChart from "./CustomActivePieChart";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const PieGraph = (props) => {

    const payments = props.payments;
    const [filteredPayments, setFilteredPayments] = useState(payments);
    const [timePeriod, setTimePeriod] = useState("all");
    const total = filteredPayments.reduce((a, b) => a + (b.money.amount || 0), 0).toFixed(2);

    const handleChange = (e) => {
        setTimePeriod(e.target.value);
    }

    const filterByTimePeriod = () => {
        setFilteredPayments(payments.filter(payment => {
            const filterFunction = getTimeFilter();
            return filterFunction(payment.date);
        }));
        console.log(filteredPayments);
    }

    const getTimeFilter = () => {
        switch(timePeriod) {
            case "year":
                return (date) => {
                    let paymentDate = new Date(date);
                    let lastYear = new Date();
                    lastYear.setFullYear(lastYear.getFullYear() - 1);

                    return paymentDate > lastYear;
                }
            case "month":
                return (date) => {
                    let paymentDate = new Date(date);
                    let lastMonth = new Date();
                    lastMonth.setMonth(lastMonth.getMonth() - 1);

                    return paymentDate > lastMonth;
                }
            case "week":
                return (date) => {
                    let paymentDate = new Date(date);
                    let lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

                    return paymentDate > lastWeek;
                }
            default:
                return (date) => true;
        }
    }

    useEffect(filterByTimePeriod, [timePeriod]);


    const mainContainerStyle = {
        width: "60%",
        margin: ".5rem auto",
        height: "100%",
        borderRadius: "1rem",
        display: "flex",
        padding: "1rem",
        boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.55)",

    }

    const textContainerStyle = {
        backgroundColor: "#f6f6f6",
        borderRadius: "1rem",
        padding: "1rem",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.55)",
}

    const chartContainerStyle = {
        fontSize: "1.25rem",
        width: "100%",
        height: "100%"
    }

    const Title = styled(Typography) ({
        borderBottom: "5px solid #00bd06",
    })

    const TimePeriodSelect = styled(FormControl) ({
        fontSize: "1.2rem",

    })

    return (
        <div style={mainContainerStyle}>
            <div style = {textContainerStyle}>
                <Title variant="h4" >
                    Category Chart
                </Title>
                <Typography variant="h6" style={{fontWeight: "300"}}>
                    Take control of your spending and budget smarter with our useful analytics - categorised in real time
                </Typography>
                <div>

                </div>
                <Typography variant="h6" style={{fontWeight: "400"}}>
                    <TimePeriodSelect
                    >
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            onChange={handleChange}
                            value={timePeriod}
                        >
                            <MenuItem value={"all"}>All time</MenuItem>
                            <MenuItem value={"week"}>Last week</MenuItem>
                            <MenuItem value={"month"}>Last month</MenuItem>
                            <MenuItem value={"year"}>Last year</MenuItem>

                        </Select>
                    </TimePeriodSelect>
                    {" "}spent: {total} RON
                </Typography>

            </div>
            <div style = {chartContainerStyle}>
                <CustomActivePieChart payments={filteredPayments}/>
            </div>
        </div>
    );
};

export default PieGraph;
