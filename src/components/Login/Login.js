import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  initializeLoginFrameWork,
  signInWithEmailAndPassword,
} from "./LoginManager";
import { handleGoogleSignIn } from "./LoginManager";
import { handleGoogleSignOut } from "./LoginManager";

initializeLoginFrameWork();
function Login() {
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect === true) {
      history.replace(from);
    }
  };
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const googleSignOut = () => {
    handleGoogleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const handleBlur = (event) => {
    let fieldValid = true;

    if (event.target.name === "email") {
      fieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordValid1 = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        event.target.value
      );
      fieldValid = isPasswordValid && isPasswordValid1;
    }
    if (fieldValid) {
      const newUser = { ...user };
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={googleSignOut}>Sign Out With Google</button>
      ) : (
        <button onClick={googleSignIn}>Sign In With Google</button>
      )}
      <br />
      <button onClick={fbSignIn}>Sign In with Facebook</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome : {user.name}</p>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <br />
      <h1>Authentication</h1>

      <form action="">
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">New User Sign Up</label>
        <br />
        {newUser && (
          <input
            name="name"
            type="text"
            required
            placeholder="Your Name"
            onBlur={handleBlur}
          />
        )}
        <br />
        <input
          type="email"
          onBlur={handleBlur}
          placeholder="Write Your Email"
          required
          name="email"
        />
        <br />
        <input
          title="It must be at least one special character and one number also more than 6 character"
          type="password"
          name="password"
          required
          onBlur={handleBlur}
          placeholder="input your password"
          id=""
        />
        <br />
        <input
          onClick={handleSubmit}
          type="submit"
          value={newUser ? "Sign Up" : "Sign In"}
        />
        <br />
      </form>
      {user.success ? (
        <p style={{ color: "green" }}>
          Your {newUser ? "registration" : "Logged In"} is successful
        </p>
      ) : (
        <p style={{ color: "red" }}>{user.error}</p>
      )}
    </div>
  );
}

export default Login;
