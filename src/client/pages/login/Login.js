import { Button, TextField } from "@material-ui/core";
import { auth, provider } from "../../../firebase";
import "../../styles/login-page.scss";
import SVG from "react-inlinesvg";
import GLogo from "../../svgs/login/google-btn.svg";
import React, { Component } from "react";
const axios = require("axios");

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordHolder: "",
      emailHolder: "",
    };
  }

  handleChange = (e, placeHolder) => {
    this.setState({
      [placeHolder]: e.target.value,
    });
  };
  signIn = () => {
    auth
      .signInWithEmailAndPassword(
        this.state.emailHolder,
        this.state.passwordHolder
      )
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        throw error;
      });
  };
  signUp = () => {
    auth
      .createUserWithEmailAndPassword(
        this.state.emailHolder,
        this.state.passwordHolder
      )
      .then((result) => {
        console.log(result);
        if (result.user) {
          let { user } = result;
          let { displayName, email, uid, phone } = user;
          this.addUserEntryToDb({ displayName, email, uid, phone });
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  addUserEntryToDb = async ({ displayName, email, uid, phone }) => {
    let query = {
      query: `mutation{
        createUser(userInput: {
          name: "${displayName ? displayName : ""}",
          email: "${email ? email : ""}",
          phone: "${phone ? phone : ""}",
          uid: "${uid ? uid : ""}"}){
            name
          }
        }`,
    };
    const response = await axios.post("http://localhost:4000/graphql", query);
    if (response) {
      console.log(response);
    }
  };
  openGooglePopup = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        throw error;
      });
  };

  render() {
    return (
      <div className="login-page-container pT20px">
        <div>
          <TextField
            label="User Name"
            value={this.state.emailHolder}
            variant="outlined"
            onChange={(e) => {
              this.handleChange(e, "emailHolder");
            }}
          />
        </div>
        <div className="mT20px">
          <TextField
            type="password"
            value={this.state.passwordHolder}
            variant="outlined"
            label="Password"
            onChange={(e) => {
              this.handleChange(e, "passwordHolder");
            }}
          />
        </div>
        <Button
          onClick={() => {
            this.signIn();
          }}
          className="google-signin-btn"
        >
          Sign in
        </Button>
        <Button
          onClick={() => {
            this.signUp();
          }}
          className="google-signin-btn mT20px"
        >
          Sign up
        </Button>
        <div className="google-btn">
          <SVG src={GLogo}></SVG>
        </div>
      </div>
    );
  }
}

export default Login;
