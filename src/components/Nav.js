import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

export default function Nav() {
  let activeStyle = {
    color: "rgb(217,16,84)",
  };
  let notActive = {
    color: "white",
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <div>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : notActive)}
            >
              <p>Weekend liga</p>
              <i className="fa-solid fa-futbol"></i>
            </NavLink>
          </div>
        </li>

        <li>
          <div>
            <NavLink
              to="/allwls"
              style={({ isActive }) => (isActive ? activeStyle : notActive)}
            >
              <p>Alle WL</p>
              <i className="fa-solid fa-futbol"></i>
            </NavLink>
          </div>
        </li>

        <li>
          <div>
            <NavLink
              to="/profil"
              style={({ isActive }) => (isActive ? activeStyle : notActive)}
            >
              <p>Din profil</p>
              <i className="fa-solid fa-user"></i>
            </NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );
}
