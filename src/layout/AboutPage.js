import React from 'react';
import {styled, Typography, Container} from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";

const AboutPage = () => {

    const MainContainer = styled(Container) ({
        width: "60%",
        margin: "120px auto .5rem auto",
        height: "100%",
        minHeight: "300px",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "2rem",
        boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.55)",
    });

    const Title = styled(Typography) ({
        borderBottom: "5px solid #00bd06",
    })

    return (
        <React.Fragment>
            <Header/>
            <MainContainer>

                <Title variant="h4">
                    About MM Finances
                </Title>
                <Typography variant="h6" style={{marginTop: "2rem", textAlign: "center", fontWeight: "300"}}>
                    Did you ever have trouble keeping track of how you spend your money?
                    <br/>
                    Ever used a spreadsheet to work out where your income went?
                    <br/>
                    <br/>
                    <b>MM Finances</b> is an app that makes keeping track of your finances easy!
                    <br/>
                    <br/>
                    The idea for this app came from a friend of mine who used a difficult to understand spreadsheet
                    to work out how he spends his income.
                    I tried to come up with a solution to make this process easier and more visually pleasing,
                    and <b>MM Finances</b> is what I came up with.
                </Typography>
            </MainContainer>
            <Footer/>
        </React.Fragment>
    );
};

export default AboutPage;
