import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import "./styles/Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as PATH from "../constants/routes";

function Login() {
  //we need to use useContext hook to utilize FirbaseContext
  //Login page is a consumer of firebase context and now we can utilize firebase services using
  //destructuring firebase context
  const { auth } = useContext(FirebaseContext);

  //react router dom hook to manually go to differnt path
  const navigate = useNavigate();

  //states to store user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState(null);

  const isInvalid = password === "" || email === "";

  useEffect(() => {
    //setting page title
    document.title = "Login - Insta";
  }, []);

  //async function to handle form submission. Allowing us to await firebase's response
  async function handleLogin(e) {
    //prevent default reload of form submission
    e.preventDefault();

    //using await and promises to use signInWithEmailAndPassword which is a prebuilt firebase function
    //this take auth reference, email and password as parameters
    //auth reference is found in lib/firebase where we intialize this refrence

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        navigate(PATH.DASH);
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        setErr(error.message);
        setTimeout(() => {
          setErr(null);
        }, 10000);
      });
  }

  return (
    <div className="login-page">
      <div className="login-modal">
        <div className="left">
          <img
            src="/images/iphone-with-profile.jpg"
            alt="girl holding iphone"
            className="iphone-img"
          />
        </div>
        <div className="right">
          <div className="insta-logo">
            <img src="/images/logo.png" alt="instagram logo" />
          </div>
          <form onSubmit={handleLogin}>
            {err && <p className="error-p">{err}</p>}

            <input
              type="email"
              placeholder="E-mail"
              aria-label="Enter your Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              aria-label="Enter your Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {/* using isIinvalid to disable or enable button and if disable reduce opacity to 50% */}
            <button
              disabled={isInvalid}
              type="submit"
              className="login-button"
              style={{ opacity: isInvalid && "50%" }}
            >
              Login
            </button>
          </form>
          <div className="signup">
            <p>
              Don't have an account? <Link to={PATH.SIGN}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
