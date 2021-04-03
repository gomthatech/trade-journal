import { Button, TextField } from "@material-ui/core";
import { auth, provider } from "../../../firebase";
import "../../styles/login-page.scss";
import SVG from "react-inlinesvg";
import GLogo from "../../svgs/login/google-btn.svg";

function Login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className="login-page-container">
      <div>
        <TextField
          label="User Name"
          variant="outlined"
          className="tj-login-text-input"
        />
      </div>
      <div class="mT20px">
        <TextField type="password" variant="outlined" label="Password" />
      </div>
      <Button onClick={signIn} className="google-signin-btn">
        Sign in
      </Button>
      <div className="google-btn">
        <SVG src={GLogo}></SVG>
      </div>
    </div>
  );
}

export default Login;
