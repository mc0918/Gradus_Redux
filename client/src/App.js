// import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// //Login component
// import Login from "./components/sign-up";

// class App extends Component {
//   state = {
//     data: null
//   };

//   componentDidMount() {
//     // Call our fetch function below once the component mounts
//     this.callBackendAPI()
//       .then(res => this.setState({ data: res.express }))
//       .catch(err => console.log(err));
//   }
//   // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
//   callBackendAPI = async () => {
//     const response = await fetch("/express_backend");
//     const body = await response.json();

//     if (response.status !== 200) {
//       throw Error(body.message);
//     }
//     return body;
//   };

//   render() {
//     return (
//       <Router>
//         <div className="container">
//           <Login />
//         </div>
//       </Router>
//     );
//   }
// }

// export default App;

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
