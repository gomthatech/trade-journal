import React, { Component } from "react";
import Login from "./client/pages/login/Login.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
            <Switch>
              <Redirect from="/" to="/login" exact></Redirect>
              <Route path="/login" component={Login}></Route>
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
