import React, { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {styled} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import LineChart from "./LineChart";
import { formatEnumString} from "../util/stringUtils";

const groupByMonth = payments => {
    return payments
        .reduce((acc, p) => {
            let paymentMonth = new Date(p.date).getMonth();
            let hasSameMonth = false;

            for (let i = 0; i < acc.length; i++) {
                if (acc[i].month === paymentMonth) {
                    acc[i].amount += p.money.amount;
                    hasSameMonth = true;
                    break;
                }
            }
            if (!hasSameMonth) {
                acc.push({
                    month: paymentMonth,
                    "amount": p.money.amount
                });
            }

            return acc;
        } , []);
}

const getMaxAmount = (data1, data2) => {
    let maxArr = [];

    for (let i = 0; i < data1.length; i++) {
        maxArr.push(data1[i].amount);
    }

    for (let i = 0; i < data2.length; i++) {
        maxArr.push(data2[i].amount);
    }

    return Math.max(...maxArr);
}

const ComparisonChart = (props) => {
    const payments = props.payments;
    const uniqueOptions = payments
        .map(p => p.paymentCategory)
        .filter((option, i, self) => self.indexOf(option) === i);


    const [option1, setOption1] = useState(uniqueOptions[0]);
    const [option2, setOption2] = useState(uniqueOptions[1]);
    const [data, setData] = useState({});
    const [max, setMax] = useState(0);



    const createData = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let filteredPayments = payments.filter(p => {
            let paymentDate = new Date(p.date);
            let now = new Date();
            let isCurrentYear = paymentDate.getFullYear() === now.getFullYear();
            let isSelected = option1 === p.paymentCategory || option2 === p.paymentCategory;
            return isSelected && isCurrentYear;
        });

        let firstOptionPayments = filteredPayments
            .filter(p => p.paymentCategory === option1);

        let secondOptionPayments = filteredPayments
            .filter(p => p.paymentCategory === option2);

        let firstOptionData = groupByMonth(firstOptionPayments);
        let secondOptionData = groupByMonth(secondOptionPayments);

        setMax(getMaxAmount(firstOptionData, secondOptionData));

        let tempData = [];
        for (let i = 0; i < monthNames.length; i++) {
            let monthData = {
                name: monthNames[i]
            };

            let currMonthAmount1 = firstOptionData.filter(d => d.month === i);
            monthData[option1] = (currMonthAmount1.length && currMonthAmount1[0].amount.toFixed(2)) || 0;

            let currMonthAmount2 = secondOptionData.filter(d => d.month === i);
            monthData[option2] = (currMonthAmount2.length && currMonthAmount2[0].amount.toFixed(2)) || 0;

            tempData.push(monthData);
        }
        setData(tempData);

    }

    useEffect(createData, [option1, option2]);
    // console.log(payments);

    const mainContainerStyle = {
        width: "70%",
        margin: ".5rem auto",
        height: "100%",
        borderRadius: "1rem",
        display: "flex",
        padding: "2rem",
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

    return (
        <div style={mainContainerStyle}>
            <div style = {textContainerStyle}>
                <Title variant="h4" >
                    Compare expenses
                </Title>
                <Typography variant="h6" style={{fontWeight: "300"}}>
                    Choose two categories to compare how much you've spent on each during the last year
                </Typography>
                <div>

                </div>
                <div>
                    <FormControl >
                        <Select
                            labelId="simple-select-label"
                            id="simple-select-2"
                            variant="outlined"
                            onChange={(e) => {
                                setOption1(e.target.value);
                            }}
                            value={option1}
                            style={{minWidth: "150px", color: "#8884d8", fontWeight: "600"}}
                        >
                            {uniqueOptions.map(option => (
                                <MenuItem value={option}>{formatEnumString(option)}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select-2"
                            onChange={(e) => {
                                setOption2(e.target.value);
                            }}
                            value={option2}
                            variant="outlined"
                            style={{minWidth: "150px", color: "#82ca9d", fontWeight: "600"}}

                        >
                            {uniqueOptions.map(option => (
                                <MenuItem value={option}>{formatEnumString(option)}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </div>
            </div>
            <div style = {chartContainerStyle}>
                <LineChart data={data} option1={option1} option2={option2} max={max}/>
            </div>
        </div>
    );
};

export default ComparisonChart;
