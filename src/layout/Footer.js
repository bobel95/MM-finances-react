import React from 'react';
import {BottomNavigation, styled, Typography} from "@material-ui/core";

const Footer = () => {

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

    return (
        <Footer>
            <Typography>MM Finances &#169; 2021</Typography>
        </Footer>
    );
};

export default Footer;
