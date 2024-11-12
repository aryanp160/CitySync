import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-brand">
        <p>
          <span className="navbar-brand01">City</span>
          <span className="navbar-brand02">Sync</span>
        </p>
      </div>
      
      {/* Hamburger Icon */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        {location.pathname !== "/" && <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>}
        {location.pathname !== "/about" && <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>}
        {location.pathname !== "/contact" && <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>}
        {location.pathname !== "/profile" && <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>}
        {location.pathname !== "/create-event" && (
          <Link
            to="/create-event"
            className="create-event-link"
            style={{
              color: "#fff",
              backgroundColor: "#b19cd9",
              padding: "12px 25px",
              borderRadius: "20px",
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            Create Event
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
