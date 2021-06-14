import React, {useState, useEffect} from 'react';
import { getUser } from "../api/appUser";
import { groupPaymentsByCategory, filterPaymentsByDate } from "../util/paymentsUtil";
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const containerStyle = {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
    justifyContent: "center"
}

const textContainerStyle = {
    marginLeft: "10px",
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
}

const getTheme = percentage => {
    let trailColor = 'lime';
    let color = 'green';

    if (percentage > 50) {
        trailColor = 'yellow';
        color = 'orange';
    }

    if (percentage > 80) {
        trailColor = 'pink';
        color = 'red';
    }

    return {
        active: {
            symbol: percentage + '%',
            trailColor: trailColor,
            color: color
        },
        error: {
            symbol: percentage + "%",
            trailColor: trailColor,
            color: color
        }
    }
}

const IncomeData = () => {

    const history = useHistory();
    const [userData, setUserData] = useState(null);
    const [paymentsData, setPaymentsData] = useState({});

    const [incomeTotal, setIncomeTotal] = useState(0);
    const [paymentsTotal, setPaymentsTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getUser()
            .then(res => {
                setUserData(res.data);
            })
    }, [])

    useEffect(() => {
        if (userData) {

            if (!userData.incomeList.length) {
                return;
            }

            let incomeDate = userData.incomeList[0].date;
            incomeDate = new Date(incomeDate);
            incomeDate.setMonth(incomeDate.getMonth() - 1);

            let filteredPayments = filterPaymentsByDate(userData.paymentList, incomeDate);
            filteredPayments = groupPaymentsByCategory(filteredPayments);

            setPaymentsData(filteredPayments)
            setPaymentsTotal(filteredPayments
                .reduce((prev, p) => prev + p.value, 0)
            );
            setIncomeTotal(userData.incomeList[0].money.amount);


            setIsLoading(false);
        }
    }, [userData]);

    return isLoading
        ? (<div style={containerStyle}>
            <Typography variant="subtitle1">
                No income added yet,
            </Typography>
            <Button
                onClick={() => history.push("/add-income")}
                style={{textTransform: "none", color: "blue"}}
            >
                add income
            </Button>
        </div>)
        : (
        <div style={containerStyle}>
            <Progress
                type="circle"
                status="error"
                strokeWidth={11}
                width={150}
                theme={getTheme((100 * paymentsTotal / incomeTotal).toFixed(2))}
                percent={
                    (100 * paymentsTotal / incomeTotal).toFixed(2)
                }
            />
            <div style={textContainerStyle}>
                <Table>
                    <caption>Resets on {new Date(userData.incomeList[0].date).getDate()}th every month</caption>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{textAlign: "center"}}>
                                <Typography variant="h6">
                                    Income: {incomeTotal} RON
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{textAlign: "center"}}>
                                <Typography variant="h6">
                                    Spent: {paymentsTotal} RON
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
        );
};

export default IncomeData;
