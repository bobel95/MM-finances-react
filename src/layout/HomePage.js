import React from 'react';
import Header from "./Header";
import {Container, Typography, styled, Paper, BottomNavigation, Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

const HomePage = (props) => {

    const mainContainerStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}background.jpg)`,
        backgroundSize: "cover",
        height: '100vh',
        width: '100vw',
        margin: "0 auto"
    };

    const contentContainerStyle = {
        padding: "2rem",
        width: "80%"
    };

    const Title = styled(Typography) ({
        textAlign: "center",
        fontWeight: "400",
        fontSize: "3rem",
        padding: ".5rem",
        color: "#3d3d3d",
        borderBottom: "5px solid #00bd06"
    });

    const Content = styled(Paper) ({
        marginTop: "120px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FFFFFFAA",
        backgroundImage: `url(${process.env.PUBLIC_URL}graph.png)`,
        backgroundSize: "contain",
        backgroundPositionY: "100%",
        backgroundRepeat: "no-repeat",
        height: "30rem"
    });

    const Footer = styled(BottomNavigation) ({
        position: "fixed",
        bottom: "0",
        left: "0",
        height: "30px",
        color: "white",
        padding: "1rem",
        backgroundColor: "#CCCCCC99",
        width: "100%"
    });

    const MyButton = styled(Button) ({
        fontFamily: "Roboto, sans-serif",
        fontWeight: 400,
        fontSize: "1.25rem",
        margin: "2rem",
        color: "#EEEEEE",
        padding: ".5rem",
        backgroundColor: "#00bd06",
        textDecoration: "none",
        "&:hover": {
            color: "#5c5c5c"
        }
    });


    const liStyle = {
        padding: ".5rem"
    }


    return (
        <div style={mainContainerStyle}>
            <Header/>
            <Container style={contentContainerStyle}>
                <Content elevation={3}>
                    <div>
                        <Title variant="h1">Start saving money</Title>

                        <div style={{
                            margin: "0 auto",
                            textAlign: "center",
                        }}>

                            <ul style={
                                {
                                    fontFamily: "Roboto, sans-serif",
                                    fontSize: "2rem",
                                    fontWeight: "400",
                                    color: "#494949",
                                    listStyle: "none",
                                    padding: "0"
                                }
                            }>
                                <li style={liStyle}>Track your spendings</li>
                                <li style={liStyle}>Make saving plans</li>
                                <li style={liStyle}>Get detailed overviews</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <MyButton
                            to="/register"
                            component={RouterLink}
                        >Sign up now!
                        </MyButton>
                    </div>
                </Content>
            </Container>
            <Footer>
                <Typography>MM Finances &#169; 2021</Typography>
            </Footer>
        </div>
    );
}

export default HomePage;