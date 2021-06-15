import {makeStyles} from "@material-ui/core/styles";

const useFormStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "green",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    message: {
        fontWeight: "200",
        textAlign: "center",
        backgroundColor: "#b7fab3",
        padding: ".25rem",
        margin: ".5rem",
        border: "1px solid",
        borderColor: "#18b300",
        borderRadius: ".5rem",
        width: "80%",
        color: "green",
    }
}));

export {useFormStyles};