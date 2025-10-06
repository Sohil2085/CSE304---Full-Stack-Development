import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignupPage from "../src/pages/SignupPage.jsx";
import ProtectedRoute from "../src/components/ProtectedRoute.jsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
