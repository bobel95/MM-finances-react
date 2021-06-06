import React, { useState, useEffect } from 'react';
import { getUser } from "../api/appUser";
import {Button, styled, Typography} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CountUp from 'react-countup';
import {AccountCircle} from "@material-ui/icons";
import ChangePasswordForm from "./ChangePasswordForm";

const createRow = (key, val) => {
    return {key, val};
}

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

    const renderUserDataTable = () => {
        setDetailsAreaContent(
            <Table aria-label="simple table" style={{height: "100%"}}>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.key}>
                            <TableCell component="th" align="center">
                                <Typography variant="subtitle1">{row.key}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle1">{row.val}</Typography>
                            </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>)
    }

    const [user, setUser] = useState({paymentList: []});
    const [totalSpent, setTotalSpent] = useState(0);
    const [numOfPayments, setNumOfPayments] = useState(0);
    const [rows, setRows] = useState([]);
    const [detailsAreaContent, setDetailsAreaContent] = useState('');
    const history = useHistory();

    useEffect(() => {
        getUser(window.localStorage.getItem("userId"))
            .then(res => setUser(res.data));
    }, []);

    useEffect(() => {
        setTotalSpent(user.paymentList
            .reduce((prev, payment) => prev + payment.money.amount, 0));

        setNumOfPayments(user.paymentList.length);

        setRows([
            createRow("First Name", user.firstName),
            createRow("Last Name", user.lastName),
            createRow("E-mail", user.email),
        ])
    }, [user])

    useEffect(renderUserDataTable, [rows]);

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
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    // minWidth: "50%",
                    width: "50%",
                    color: "#f1f1f1",
                }}>

                    <Typography variant="subtitle2" style={
                        {
                            margin: "0 0 0 1rem",
                            alignSelf: "self-start",
                            color: "#0e4200"
                        }}>Settings</Typography>
                    <hr style={{width: "100%", color: "black"}}/>
                    <CustomButton onClick={() => renderUserDataTable()}>
                        <Typography variant="h6">User Details</Typography>
                    </CustomButton>
                    <CustomButton onClick={() => history.push("/data")}>
                        <Typography variant="h6">Spending Data</Typography>
                    </CustomButton>
                    <CustomButton
                        onClick={() =>
                            setDetailsAreaContent(<ChangePasswordForm reload={renderUserDataTable}/>)}>
                        <Typography variant="h6">Change Password</Typography>
                    </CustomButton>

                    <Typography variant="subtitle2" style={
                        {
                            margin: "1rem 0 0 1rem",
                            alignSelf: "self-start",
                            color: "#930505"
                        }}>Danger zone</Typography>
                    <hr style={{width: "100%", color: "black"}}/>
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
