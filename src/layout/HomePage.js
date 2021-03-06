import React from 'react';
import Header from "./Header";
import {Container, Typography, styled, Paper, Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import { toast } from 'react-toastify';
import Footer from "./Footer";

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



    const MyButton = styled(Button) ({
        fontFamily: "Roboto, sans-serif",
        fontWeight: 400,
        fontSize: "1.25rem",
        margin: "2rem",
        borderRadius: "10px",
        color: "#EEEEEE",
        padding: ".75rem",
        backgroundColor: "#00bd06",
        textDecoration: "none",
        transition: "color ease-in-out .4s, background-color ease-in-out .4s",
        "&:hover": {
            color: "#225800",
            backgroundColor: "#00bd0655"
        }
    });


    const liStyle = {
        padding: ".5rem"
    }

    if (props.location.state) {
        const { loggedOut } = props.location.state;
        if (loggedOut) {
            toast.warn(
                "Logged Out",
                {
                    position: "bottom-center"
                }
            )

            props.location.state = {};
        }
    }

    const button = window.localStorage.getItem("isLogged")
        ? (
            <MyButton
                to="/add"
                component={RouterLink}
            >Get Started
            </MyButton>
        )
        : (
            <MyButton
                to="/register"
                component={RouterLink}
            >Sign up now!
            </MyButton>
        )


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
                                <li style={liStyle}>Track your expenses</li>
                                <li style={liStyle}>Make saving plans</li>
                                <li style={liStyle}>Get detailed overviews</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        {button}
                    </div>
                </Content>
            </Container>
            <Footer/>
        </div>
    );
}

export default HomePage;