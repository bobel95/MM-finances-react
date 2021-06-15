import './App.css';
import HomePage from "./layout/HomePage";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import LoginPage from "./layout/LoginPage";
import AddPaymentPage from "./layout/AddPaymentPage";
import DataPage from "./layout/DataPage";
import Logout from "./components/Logout";
import RegisterPage from "./layout/RegisterPage";
import AboutPage from "./layout/AboutPage";
import MyAccountPage from "./layout/MyAccountPage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIncomePage from "./layout/AddIncomePage";
import UpdateIncomePage from "./layout/UpdateIncomePage";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            window.localStorage.getItem("isLogged") ? (
                <Component {...props} />
            ) : (
                <Redirect
                    // Redirect the user to login page
                    // Pass the last route accessed in the state
                    // to redirect to it after the user logs in
                    to={{
                        pathname: "/login",
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);

toast.configure();

function App() {

  return (
      <Router>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <PrivateRoute path="/add" component={AddPaymentPage}/>
          <PrivateRoute path="/data" component={DataPage}/>
          <PrivateRoute path="/account" component={MyAccountPage}/>
          <PrivateRoute path="/add-income" component={AddIncomePage}/>
          <PrivateRoute path="/update-income" component={UpdateIncomePage}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/about" component={AboutPage}/>
      </Router>
  );
}

export default App;
