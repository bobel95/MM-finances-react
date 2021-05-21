import './App.css';
import HomePage from "./layout/HomePage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./layout/LoginPage";
import AddPaymentPage from "./layout/AddPaymentPage";
import DataPage from "./layout/DataPage";
import RegisterPage from "./layout/RegisterPage";

function App() {

  return (
      <Router>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/add" component={AddPaymentPage}/>
          <Route path="/data" component={DataPage}/>
          <Route path="/register" component={RegisterPage}/>
      </Router>
  );
}

export default App;
