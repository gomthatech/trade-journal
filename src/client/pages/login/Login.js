import { Button } from "@material-ui/core";
import { auth, provider } from "../../../firebase";
import "../../styles/login-page.scss";
import SVG from "react-inlinesvg";
import GLogo from "./google-btn.svg";

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
