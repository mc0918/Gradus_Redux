//DEPRECATED! NOT A FILE IN USE!!!

import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/", user)
      .then(response => {
        console.log(response.data);
        if (response.data) {
          console.log("successful register");
          this.setState({ redirectTo: "/login" });
        } else {
          console.log("sign-up error");
        }
      })
      .catch(error => {
        console.log("sign-up server error: ");
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
