import React from "react";
import { AppBar, Toolbar, Typography, Button, styled, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";


const Header = () => {

    const headersDataLoggedIn = [
        {
            label: "About",
            href: "/about",
        },
        {
            label: "Add Spending",
            href: "/add",
        },
        {
            label: "Data",
            href: "/data",
        },
        {
            label: "My Account",
            href: "/account",
        },
        {
            label: "Log Out",
            href: "/logout",
        },
    ];

    const headersDataNotLogged = [
        {
            label: "About",
            href: "/about",
        },
        {
            label: "Log in",
            href: "/login",
        },
    ];

    const getMenuButtons = () => {
        const headersData = window.localStorage.getItem("isLogged")
            ? headersDataLoggedIn
            : headersDataNotLogged;

        return headersData.map(( {label, href} ) => {
            return (
                <MyButton
                    key={label}
                    to={href}
                    component={RouterLink}
                    className="menuButton"
                >
                    {label}
                </MyButton>
            )
        })
    }

    const MyButton = styled(Button) ({
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
        fontSize: "1rem",
        margin: "1.25em",
        color: "#EEEEEE",
        textDecoration: "none",
        "&:hover": {
            color: "#5c5c5c"
        }
    });

    const MyAppBar = styled(AppBar) ({
        backgroundColor: "#00bd0699",
        height: "60px",
    });

    const Logo = styled(Typography) ({
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        fontSize: "30px",
        color: "#FFFEFE",
        textAlign: "left",
    })

    const MyToolbar = styled(Toolbar) ({
        display: "flex",
        justifyContent: "space-around",
    })


    return (
        <header>
            <MyAppBar>
                <MyToolbar>
                    <Logo variant="h4">
                        <Link
                            to="/"
                            component={RouterLink}
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                            }}>
                            MM Finances
                        </Link>
                    </Logo>
                    <div>
                        {getMenuButtons()}
                    </div>
                </MyToolbar>
            </MyAppBar>
        </header>
    );
}

export default Header;