import React from 'react';
import Typography from "@material-ui/core/Typography";
import {styled} from "@material-ui/core";
import CustomActivePieChart from "./CustomActivePieChart";

const PieGraph = (props) => {

    const payments = props.payments;

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

    return (
        <div style={mainContainerStyle}>
            <div style = {textContainerStyle}>
                <Title variant="h4" gutterBottom>
                    Category Chart
                </Title>
                <Typography variant="h5">
                    Take control of your spending and budget smarter with our useful analytics - categorised in real time
                </Typography>
            </div>
            <div style = {chartContainerStyle}>
                <CustomActivePieChart payments={payments}/>
            </div>
        </div>
    );
};

export default PieGraph;
