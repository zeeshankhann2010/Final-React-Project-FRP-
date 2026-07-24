import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Donate Blood", href: "/donate" },
  { label: "Find Donors", href: "/donor" },
  { label: "About Us", href: "/about" },
];

const infoLinks = [
  { label: "How It Works", href: "#" },
  { label: "Blood Compatibility", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "FAQ", href: "#" },
];

const socialLinks = [
  { icon: "fa-facebook-f", href: "https://facebook.com", label: "Facebook" },
  { icon: "fa-twitter", href: "https://twitter.com", label: "Twitter" },
  { icon: "fa-instagram", href: "https://instagram.com", label: "Instagram" },
  { icon: "fa-linkedin-in", href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    console.log("Subscribed:", email);
    setEmail("");
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 2500);
  };

  // Backup fix: force scroll to top on internal nav
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__glow"></div>

      <div className="footer__container">
        {/* Brand + Newsletter */}
        <div className="footer__brand">
          <div className="footer__logo">
            <i className="fa-solid fa-droplet footer__logo-icon"></i>
            <span className="footer__logo-text">BloodBank</span>
          </div>

          <p className="footer__tagline">
            A platform connecting donors with those in need. Every drop
            counts — join our mission to save more lives.
          </p>


          <div className="footer__socials">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={s.label}
              >
                <i className={`fa-brands ${s.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__column">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__links">
            {quickLinks.map((link) => (
              <li key={link.label} className="footer__links-item">
                <Link
                  to={link.href}
                  className="footer__link"
                  onClick={handleLinkClick}
                >
                  <i className="fa-solid fa-chevron-right footer__link-icon"></i>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div className="footer__column">
          <h4 className="footer__heading">Information</h4>
          <ul className="footer__links">
            {infoLinks.map((link) => (
              <li key={link.label} className="footer__links-item">
                <Link
                  to={link.href}
                  className="footer__link"
                  onClick={handleLinkClick}
                >
                  <i className="fa-solid fa-chevron-right footer__link-icon"></i>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__column">
          <h4 className="footer__heading">Contact Us</h4>
          <ul className="footer__contact">
            <li className="footer__contact-item">
              <span className="footer__contact-icon-wrap">
                <i className="fa-solid fa-phone"></i>
              </span>
              <span>+92 300 1234567</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-icon-wrap">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <span>info@bloodbank.com</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-icon-wrap">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              <span>Karachi, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} BloodBank. All Rights Reserved.
        </p>
        <div className="footer__bottom-links">
          <Link to="/privacy-policy" onClick={handleLinkClick}>
            Privacy
          </Link>
          <span className="footer__dot">•</span>
          <Link to="/terms" onClick={handleLinkClick}>
            Terms
          </Link>
        </div>
      </div>
    </footer >
  );
};

export default Footer;