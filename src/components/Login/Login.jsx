import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import "./Login.scss";
const Login = () => {
  const [name, setName] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const dispatch = useDispatch();
  const logintoApp = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
      console.log(userCredentials);
      alert('logged in')
      // );
    }).catch(err=>alert(err));
  };
  const register = async () => {
    if (!name) {
      return alert("Please enter a name");
    }

    try {
      createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(userDetails => { 
        console.log(userDetails)
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imageurl
        });
        console.log('profile updated on firebase')
      }).catch(err=>console.log(err));
    } catch (err) {
      alert(err);
    }
  };
  console.log("render");
  return (
    <div className="login">
      <img
        src="https://www.paperlesslabacademy.com/wp-content/uploads/2017/02/linkedin-logo-transparent.png"
        width="100%"
        height="100%"
      />
      <form>
        <input
          type="text"
          placeholder="Full Name (required if registring)"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Photo url (optional)"
          value={imageurl}
          onChange={e => setImageurl(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={logintoApp}>Sign In</button>
      </form>
      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
};

export default Login;
