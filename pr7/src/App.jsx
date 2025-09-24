import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const toggle = nav?.querySelector(".nav-toggle");

    const handleToggle = () => {
      nav.classList.toggle("is-active");
    };

    const handleBlur = () => {
      nav.classList.remove("is-active");
    };

    if (toggle) {
      toggle.addEventListener("click", handleToggle);
      nav.addEventListener("blur", handleBlur);
    }

    return () => {
      if (toggle) toggle.removeEventListener("click", handleToggle);
      if (nav) nav.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <>
      <div className="nav-container" tabIndex="0" ref={navRef}>
        <div className="nav-toggle"></div>

        <nav className="nav-items">
          <a className="nav-item" href="#">
            Home
          </a>
          <a className="nav-item" href="#">
            Contact Us
          </a>
          <a className="nav-item" href="#">
            About Us
          </a>
        </nav>
      </div>
      <div className="content">
        <h1>Welcome to My Website</h1>
        <p>This is the main content of the webpage.</p>
      </div>
    </>
  );
}

export default App;
