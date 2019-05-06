//===========OTHER TUTORIAL==============
// App.js
//RUN NPM START AND NODEMON SERVER.JS AND MONGOD TO WORK APP LOCALLY

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Create from "./components/Create";
import Index from "./components/Index";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href={"/"}>
              App
            </a>
            <Link to={"/create"}>Create</Link>
            <Link to={"/index"}>Index</Link>
          </nav>

          <br />
          <Switch>
            <Route exact path="/create" component={Create} />
            <Route path="/index" component={Index} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
