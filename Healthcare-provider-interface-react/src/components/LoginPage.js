import React, { useState } from "react";

import "./LoginPage.css"; // Import CSS file for styling
import { auth } from "../firebase"; // Import Firebase auth service
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        console.log("Login successful:", userCredential.user);
        window.location.href = "/groups";
      })
      .catch((error) => {
        // Handle login error (e.g., display error message)
        console.error("Login error:", error.message);
      });
  };

  const handleGoogleLogin = async () => {
    // Handle Google login
    // Redirect to /groups on successful login
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google login successful:", result.user);
    } catch (error) {
      console.error("Google login error:", error.message);
    }
    window.location.href = "/groups";
  };

  return (
    <div className="login-page-container">
      <div className="left-half" /> {/* Red color */}
      <div className="right-half">
        <form
          onSubmit={handleLogin}
          className="shadow-gray-300 shadow-lg flex flex-col w-[350px] "
        >
          <h1 className="text-center font-semibold ">Cool App</h1>
          <div className="flex flex-col space-y-2">
            <h4>Username</h4>
            <input
              type="email"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-3">
            <h4>Password</h4>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
          </div>
          <div className="flex flex-row justify-between mt-2">
            <div className="flex flex-row space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                className="w-[14px] h-[14px] mt-1"
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label>Remember Me</label>
            </div>
            <a href="http://localhost:3000/">Forgot password?</a>
          </div>

          <br />
          <button type="submit hover:text-black">Log In</button>
          <br />
          <div className="horizontal-bar">
            <hr className="line" />
            <span className="or">or</span>
            <hr className="line" />
          </div>
          <div
            className="google-signin flex flex-row w-full space-x-3 justify-center items-center"
            onClick={handleGoogleLogin}
          >
            <a>Sign in with Google</a>
            <GoogleIcon className="text-rose-700" />
          </div>
          <p className="mt-2 text-center">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
