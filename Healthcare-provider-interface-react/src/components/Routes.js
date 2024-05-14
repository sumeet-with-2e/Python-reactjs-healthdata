import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

const Path = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/login" Component={LoginPage} />
          <Route exact path="/signup" Component={SignupPage} />
        </Routes>
      </div>
    </Router>
  );
};

export default Path;
