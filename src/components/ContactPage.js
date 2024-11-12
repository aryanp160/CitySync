import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "../styles/ContactUs.css";
const ContactPage = () => {
  return (
    <div className="contact-page">
      <h2>Meet the Team</h2>
      
      <div className="team-members-container">
        {/* Team Member 1 */}
        <div className="team-member">
          <h3>Aryan Pathak</h3>
          <div className="social-links">
            <a href="https://github.com/aryanp160" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/aryan-pathak-69a7b22a3" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/_aryan1p" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Team Member 2 */}
        <div className="team-member">
          <h3>Aditi Sharma</h3>
          <div className="social-links">
            <a href="https://github.com/Aditi-Sharma-27" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/aditi-sharma-b53630338" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/Aditi_Sharma_27" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
