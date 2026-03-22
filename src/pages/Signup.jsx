import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import "./styles/Login.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import * as PATH from "../constants/routes";
import { doesUserNameExists, addUserDocument } from "../services/firebase";

function Signup() {
  //we need to use useContext hook to utilize FirbaseContext
  //Login page is a consumer of firebase context and now we can utilize firebase services using
  //destructuring firebase context
  const { auth } = useContext(FirebaseContext);

  //react router dom hook to manually go to differnt path
  const navigate = useNavigate();

  //states to store user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");

  const [err, setErr] = useState(null);

  const isInvalid =
    password === "" || email === "" || userName === "" || fullName === "";

  useEffect(() => {
    //setting page title
    document.title = "Signup - Insta";
  }, []);

  async function handleLogin(e) {
    //prevent default reload of form submission
    e.preventDefault();

    //checking if userName exits already
    //if user exists giving a error,  else creating a new user

    const userExists = await doesUserNameExists(userName);

    if (userExists) {
      setErr("username already exits. Try with another one");
      setTimeout(() => {
        setErr(null);
      }, 10000);
    } else {
      //using try and catch to use createUserWithEmailAndPassword which is a prebuilt firebase function
      //this take auth reference, email and password as parameters
      //after user is created storing a reference to it in createdUSer variable

      try {
        const createdUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // console.log(createdUser.user);
        //updating displayName property of user Object
        await updateProfile(createdUser.user, {
          displayName: userName,
        });

        //creating a document in collection 'users' using firestore
        addUserDocument(userName, createdUser.user.uid, email, fullName);

        navigate(PATH.DASH);
      } catch (err) {
        setErr(err.message);
        setTimeout(() => {
          setErr(null);
        }, 10000);
      }
    }
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
              type="text"
              placeholder="User Name"
              aria-label="Enter your user name"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Full name"
              aria-label="Enter your full Name"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
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
              Already Have an account? <Link to={PATH.LOGIN}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
