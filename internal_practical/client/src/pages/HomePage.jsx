import React from "react";
import Navbar from "../components/Navbar.jsx";

export default function HomePage() {
  // navbar data
  const navbar = {
    brand: { linkTo: "#", text: "React Bootstrap Navbar" },
    links: [
      { linkTo: "#", text: "Link 1" },
      { linkTo: "#", text: "Link 2" },
      {
        dropdown: true,
        text: "Dropdown",
        links: [
          { linkTo: "#", text: "Dropdown Link 1" },
          { linkTo: "#", text: "Dropdown Link 2", active: true },
        ],
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
      </div>
    </div>
  );
}
