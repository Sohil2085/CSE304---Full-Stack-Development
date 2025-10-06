import React from "react";

// Brand
const NavBrand = ({ linkTo = "#", text = "" }) => (
  <a className="navbar-brand" href={linkTo}>{text}</a>
);

// Single link
const NavLink = ({ linkTo = "#", text = "", active = false }) => (
  <li className={active ? "active" : ""}>
    <a href={linkTo}>{text}</a>
  </li>
);

// Dropdown menu
const NavLinkDropdown = ({ text = "", links = [] }) => {
  const active = links.some(link => link.active);
  return (
    <li className={`dropdown ${active ? "active" : ""}`}>
      <a
        href="#"
        className="dropdown-toggle"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {text} <span className="caret"></span>
      </a>
      <ul className="dropdown-menu">
        {links.map((link, i) => (
          <NavLink key={i} {...link} />
        ))}
      </ul>
    </li>
  );
};

// Menu
const NavMenu = ({ links = [] }) => (
  <ul className="nav navbar-nav">
    {links.map((link, i) =>
      link.dropdown ? (
        <NavLinkDropdown key={i} {...link} />
      ) : (
        <NavLink key={i} {...link} />
      )
    )}
  </ul>
);

// Main Navbar
const Navbar = ({ brand = {}, links = [] }) => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar-collapse"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <NavBrand {...brand} />
        </div>
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <NavMenu links={links} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  