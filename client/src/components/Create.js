// Create.js

import React, { Component } from "react";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);
    // this.onChangeHostName = this.onChangeHostName.bind(this);
    // this.onChangePort = this.onChangePort.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
      password: ""
    };
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
    // console.log(user);
    axios
      .post("/userRoute/add", user)
      .then(res => console.log("user added: " + res.data));
  };

  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <h3>Add New User</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Add Email: </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label>Add Password: </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
