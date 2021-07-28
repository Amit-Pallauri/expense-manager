import React from "react";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import { Switch, Redirect, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Navtopbar from "./components/Navtopbar";

function App() {
  return (
    <div className="App">
      <Navtopbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signUp" component={RegisterPage} />
        <Route exact path="/signIn" component={LoginPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
