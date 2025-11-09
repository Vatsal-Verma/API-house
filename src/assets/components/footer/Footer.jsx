import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="footer-slash">&gt;_</span>
        <span className="footer-title">APIHOUSE</span>
      </div>

      <ul className="footer-links">
        <li><a href="/">Home</a></li>
        <li><a href="/test">Test</a></li>
        <li><a href="/performance">Performance</a></li>
        <li><a href="#">Support</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <div className="footer-divider"></div>

      <div className="footer-social">
        {/* <a href="#"><FaTwitter /></a> */}
        <a href="https://www.linkedin.com/in/vatsal-verma-b27925291/"><FaLinkedin /></a>
        {/* <a href="#"><FaInstagram /></a> */}
        <a href="https://github.com/Vatsal-Verma"><FaGithub /></a>
      </div>

      <p className="footer-copy">© {new Date().getFullYear()} APIHouse. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
