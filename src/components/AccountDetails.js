import React, { useState, useEffect } from 'react';
import { getUser } from "../api/appUser";
import {Button, styled, Typography} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CountUp from 'react-countup';
import {AccountCircle} from "@material-ui/icons";

const AccountDetails = () => {

    const containerStyle = {
        display: "flex",
        width: "100%",
        minHeight: "300px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }

    const dataContainerStyle = {
        backgroundColor: "#f1f1f1",
        background: "linear-gradient(#ddd, #ddd) no-repeat center/2px 100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        border: "1px solid #a2a2a2",
        borderRadius: "1rem",
        margin: "1rem",
        width: "100%",
        padding: "1rem 0"
    }

    const secondaryContainerStyle = {
        background: "linear-gradient(to left, #f1f1f1 50%, #00bd0699 50%)",
        flex: "1",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        border: "1px solid #a2a2a2",
        borderRadius: "1rem",
        width: "100%",
        padding: "1rem 0"
    }

    const Title = styled(Typography) ({
        borderBottom: "5px solid #00bd0699",
    })

    const CustomButton = styled(Button) ({
        color: "white",
        // Stop transforming button text to uppercase
        textTransform: "none"
    })

    const [user, setUser] = useState({paymentList: []});
    const [totalSpent, setTotalSpent] = useState(0);
    const [numOfPayments, setNumOfPayments] = useState(0);

    useEffect(() => {
        getUser(window.localStorage.getItem("userId"))
            .then(res => setUser(res.data));
    }, []);

    console.log(user);

    useEffect(() => {
        setTotalSpent(user.paymentList
            .reduce((prev, payment) => prev + payment.money.amount, 0));
        setNumOfPayments(user.paymentList.length);
    }, [user])

    const rows = [
        {}
    ]


    const detailsAreaContent = (
        <Table aria-label="simple table" style={{height: "100%"}}>
            <TableBody>
                <TableRow>
                    <TableCell component="th" align="center">
                        First Name
                    </TableCell>
                    <TableCell align="center">{user.firstName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" align="center">
                        Last Name
                    </TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" align="center">
                        E-mail
                    </TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )

    return (
        <div style={containerStyle}>
            <AccountCircle fontSize="large" />
            <Title variant="h4" style={{margin: "1rem"}}>
                {`${user.firstName} ${user.lastName}`}
            </Title>
            <div style={dataContainerStyle}>
                <div>
                    <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={numOfPayments}
                            duration={3}
                            suffix=" Transactions"
                        />
                    </Typography>
                </div>
                <div>
                    <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={totalSpent}
                            duration={2}
                            decimals={2}
                            prefix="RON "
                            suffix=" spent"
                        />
                    </Typography>
                </div>
            </div>
            <div style={secondaryContainerStyle}>
                <div id="buttons-container" style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems:"center",
                    // minWidth: "50%",
                    width: "50%",
                    color: "#f1f1f1",
                }}>
                    <CustomButton onClick={() => {
                        document.querySelector("#buttons-container").style.width = "30%";
                    }}>
                        <Typography variant="h6">Add income</Typography>
                    </CustomButton>
                    <CustomButton>
                        <Typography variant="h6">Change Password</Typography>
                    </CustomButton>
                    <CustomButton>
                        <Typography variant="h6">Change Email</Typography>
                    </CustomButton>
                    <CustomButton variant="contained" style={{backgroundColor: "#ff5e5e", margin: "1rem"}}>
                        <Typography variant="subtitle2">Delete Account</Typography>
                    </CustomButton>
                </div>
                <div id="details-container" style={{minWidth: "50%"}}>
                    {detailsAreaContent}
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
