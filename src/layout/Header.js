import React from "react";
import { AppBar, Toolbar, Typography, Button, styled } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";


const Header = () => {

    const headersData = [
        {
            label: "Add Payment",
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

    const getMenuButtons = () => {
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
        size: "18px",
        margin: "1.25rem",
        color: "#EEEEEE",
        textDecoration: "none",
        "&:hover": {
            color: "#5c5c5c"
        }
    });

    const MyAppBar = styled(AppBar) ({
        backgroundColor: "#00bd0699",
        height: "80px",
        // width: "80%",
        // left: "50%",
        // transform: "translateX(-50%)"
    });

    const Logo = styled(Typography) ({
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
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
                    <Logo variant="h6" component="h1">
                         MM Finances
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