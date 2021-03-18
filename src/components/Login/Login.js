import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
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
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signInInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signInInfo);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log(
          "Error Code:",
          errorCode,
          "Error Message:",
          errorMessage,
          "Credential :",
          credential,
          "Email:",
          email
        );
        // ...
      });
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })

        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ..
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log("sign In user info", res.user);
        })

        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ..
        });
    }
    e.preventDefault();
  };
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signOutInfo = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signOutInfo);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        console.log("facebook login successful. Hi,", user);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(
          "from fb error",
          errorCode,
          errorMessage,
          email,
          credential
        );

        // ...
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out With Google</button>
      ) : (
        <button onClick={handleSignIn}>Sign In With Google</button>
      )}
      <br />
      <button onClick={handleFbSignIn}>Sign In with Facebook</button>
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
