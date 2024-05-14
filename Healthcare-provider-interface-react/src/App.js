import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import GroupsPage from "./components/GroupsPage";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" Component={LoginPage} />
          <Route exact path="/signup" Component={SignupPage} />
          <Route exact path="/groups" element={<GroupsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
