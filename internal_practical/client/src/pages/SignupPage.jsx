import React, { useState } from "react";
import "./SignupPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        signupData
      );
      alert("Account created successfully!");
    //   navigate("/"); 
    } catch (err) {
      alert("Signup failed!");
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        loginData
      );
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
    //   navigate("/");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id="container"
    >
      {/* Sign Up Form */}
      <div className="form sign_up">
        <form onSubmit={handleSignup}>
          <h1>Create An Account</h1>
          <div className="social-container">
            <a href="https://github.com/Sohil2085">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="https://github.com/Sohil2085">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <span>Use email for registration</span>
          <input
            type="text"
            placeholder="User Name"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <button type="submit">Create Account</button>
        </form>
      </div>

      {/* Login Form */}
      <div className="form sign_in">
        <form onSubmit={handleLogin}>
          <h1>Login In</h1>
          <div className="social-container">
            {/* <a href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </a> */}
            <a href="https://github.com/Sohil2085">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="https://github.com/Sohil2085">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <span>Login with your Account</span>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <span>
            Forgot your <span className="forgot">password?</span>
          </span>
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Overlay Section */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-pannel overlay-left">
            <h1>Already have an account</h1>
            <p>Please Login</p>
            <button
              className="overBtn"
              onClick={() => setIsRightPanelActive(false)}
            >
              Sign In
            </button>
          </div>
          <div className="overlay-pannel overlay-right">
            <h1>Create Account</h1>
            <p>Start Your Journey with Us</p>
            <button
              className="overBtn"
              onClick={() => setIsRightPanelActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
