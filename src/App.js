import './App.css';
import HomePage from "./layout/HomePage";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import LoginPage from "./layout/LoginPage";
import AddPaymentPage from "./layout/AddPaymentPage";
import DataPage from "./layout/DataPage";
import Logout from "./components/Logout";

import RegisterPage from "./layout/RegisterPage";

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

function App() {

  return (
      <Router>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <PrivateRoute path="/add" component={AddPaymentPage}/>
          <PrivateRoute path="/data" component={DataPage}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/register" component={RegisterPage}/>
      </Router>
  );
}

export default App;
