import React, { Component } from "react";
import Login from "./client/pages/login/Login.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const axios = require("axios");
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
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
      <Router>
        <ThemeProvider theme={darkTheme}>
          <div className="App">
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/home">
                <h2>Home</h2>
              </Route>
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}
export default App;
