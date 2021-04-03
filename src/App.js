import React, { Component } from "react";
import Login from "./client/pages/login/Login.js";

const axios = require("axios");

class App extends Component {
  state = {
    usersList: [{ name: "Hello" }],
  };
  fetchUsers = () => {
    this.sendQuery(`query {
  users {
    name
  }
}`);
  };
  sendQuery = (query) => {
    return axios
      .post("http://localhost:4000/graphql", {
        query,
      })
      .then(({ data }) => {
        console.log(data, data?.data?.users);
        this.setState({ usersList: data?.data?.users });
      });
  };
  render() {
    return (
      <div
        onClick={() => {
          this.fetchUsers();
        }}
        className="App"
      >
        <Login></Login>
      </div>
    );
  }
}
export default App;
