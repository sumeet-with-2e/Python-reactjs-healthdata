import React, { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import "./LoginPage.css"; // Import CSS file for styling
import { auth } from "../firebase"; // Adjust path as needed
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      // Optionally, you can redirect the user to another page upon successful signup
      window.location.href = "/";
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <div className="login-page-container  flex flex-row  ">
      <div className="w-1/2 bg-[#B00040] h-screen " /> {/* Red color */}
      <div className="flex flex-col justify-center items-center h-screen w-1/2 ">
        <form
          onSubmit={handleSignup}
          className="shadow-gray-300 shadow-lg flex flex-col w-[350px]"
        >
          <h1 className="text-center font-semibold ">Cool App</h1>
          <div className="flex flex-col space-y-2 mt-2">
            <h4>Name</h4>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <h4>Email</h4>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <h4>Password</h4>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <h4>Confirm Password</h4>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <br />
          <button className="mt-2" type="submit">
            Sign Up
          </button>
          <div className="horizontal-bar">
            <hr className="line" />
            <span className="or">or</span>
            <hr className="line" />
          </div>
          <p className="text-center">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
