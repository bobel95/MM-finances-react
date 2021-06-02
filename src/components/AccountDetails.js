import React, { useState, useEffect } from 'react';
import { getUser } from "../api/appUser";
import {Button, styled, Typography} from "@material-ui/core";

const AccountDetails = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        getUser(window.localStorage.getItem("userId"))
            .then(res => setUser(res.data));
    }, []);

    console.log(user);

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


    return (
        <div style={containerStyle}>
            <Title variant="h4" style={{margin: "1rem"}}>
                {`${user.firstName} ${user.lastName}`}
            </Title>
            <div style={dataContainerStyle}>
                <div >
                    <Typography variant="h5">
                        1230 transactions
                    </Typography>
                </div>
                <div>
                    <Typography variant="h5">
                        1230 RON spent
                    </Typography>
                </div>
            </div>
            <div style={secondaryContainerStyle}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", minWidth: "50%", color: "#f1f1f1"}}>
                    <CustomButton>
                        <Typography variant="h6">Add income</Typography>
                    </CustomButton>
                    <CustomButton>
                        <Typography variant="h6">Change Password</Typography>
                    </CustomButton>
                    <CustomButton>
                        <Typography variant="h6">Change Email</Typography>
                    </CustomButton>
                    <CustomButton variant="contained" style={{backgroundColor: "#ff5e5e"}}>
                        <Typography variant="h6">Delete Account</Typography>
                    </CustomButton>
                </div>
                <div style={{minWidth: "50%"}}>

                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
