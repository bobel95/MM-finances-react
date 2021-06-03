import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';

import useSignInForm from "../hooks/useSignInForm";
import { useLocation } from 'react-router-dom'
import useChangePasswordForm from "../hooks/useChangePasswordForm";



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ChangePasswordForm = (props) => {
    const classes = useStyles();

    const { values, handleChange, handleSubmit, errors } = useChangePasswordForm();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    Change Password
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        id="previousPassword"
                        label="Actual Password"
                        name="previousPassword"
                        type="password"
                        value={values.previousPassword}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                    />

                    {errors.message && <p style={{
                        textAlign: "center",
                        border: "1px solid #700",
                        borderRadius: ".25rem",
                        backgroundColor: "#fdc4c4",
                        color: "#700",
                        padding: "1rem"}}>{errors.message}</p>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default ChangePasswordForm;