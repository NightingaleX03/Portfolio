import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../rig.css";
import "./V1Navbar.css";

const links = [
  { to: "/", label: "Board", end: true },
  { to: "/commit/v1/projects", label: "Projects", end: false },
  { to: "/commit/v1/journey", label: "Journey", end: false },
];

const V1Navbar: React.FC = () => {
  const navigate = useNavigate();

  const reboot = () => {
    try {
      sessionStorage.removeItem("rig-booted");
    } catch {
      /* storage unavailable */
    }
    navigate("/");
    window.dispatchEvent(new Event("rig:reboot"));
  };

  return (
    <nav className="rig rig-nav" aria-label="Front panel">
      <div className="rig-nav-brand">
        <span className="rig-led rig-led-power" aria-hidden="true" />
        <span className="rig-nav-name">Sarah Mathew</span>
      </div>
      <div className="rig-nav-actions">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `rig-nav-btn${isActive ? " is-pressed" : ""}`}
          >
            {link.label}
          </NavLink>
        ))}
        <button type="button" className="rig-nav-btn" onClick={reboot}>
          <span className="rig-led rig-led-activity" aria-hidden="true" />
          Reboot
        </button>
      </div>
    </nav>
  );
};

export default V1Navbar;
