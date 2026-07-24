import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";

const NAV_LINKS = [
    { label: "Home", path: "/home" },
    { label: "Donate Blood", path: "/donate" },
    { label: "Find a Donor", path: "/donor" },
    { label: "About Us", path: "/about" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Listen for login/logout + fetch role
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    const userRef = doc(db, "users", currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setRole(userSnap.data().role);
                    } else {
                        setRole(null);
                    }
                } catch (error) {
                    console.log(error);
                    setRole(null);
                }
            } else {
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    async function handleLogout() {
        try {
            await signOut(auth);
            alert("Logged out successfully!");
            setIsOpen(false);
        } catch (error) {
            console.log(error);
            alert("Logout failed!");
        }
    }

    return (
        <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar__container">

                {/* Logo */}
                <Link to="/home" className="navbar__logo" onClick={scrollToTop}>
                    <span className="navbar__logo-icon-wrap">
                        <i className="fa-solid fa-droplet navbar__logo-icon"></i>
                    </span>

                    <span className="navbar__logo-text">
                        Blood<span className="navbar__logo-highlight">Bank</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <nav className="navbar__links">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            to={link.path}
                            className="navbar__link"
                            onClick={scrollToTop}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {role === "admin" && (
                        <Link
                            to="/admin"
                            className="navbar__link"
                            onClick={scrollToTop}
                        >
                            Admin
                        </Link>
                    )}
                </nav>

                {/* Desktop Buttons */}
                <div className="navbar__actions">
                    {user ? (
                        <button
                            className="navbar__btn navbar__btn--ghost"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="navbar__btn navbar__btn--ghost"
                                onClick={scrollToTop}
                            >
                                Log In
                            </Link>

                            <Link
                                to="/signup"
                                className="navbar__btn navbar__btn--primary"
                                onClick={scrollToTop}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`navbar__toggle ${isOpen ? "navbar__toggle--active" : ""
                        }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <nav
                className={`navbar__mobile ${isOpen ? "navbar__mobile--open" : ""
                    }`}
            >
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.label}
                        to={link.path}
                        className="navbar__mobile-link"
                        onClick={() => {
                            setIsOpen(false);
                            scrollToTop();
                        }}
                    >
                        {link.label}
                    </Link>
                ))}

                {role === "admin" && (
                    <Link
                        to="/admin"
                        className="navbar__mobile-link"
                        onClick={() => {
                            setIsOpen(false);
                            scrollToTop();
                        }}
                    >
                        Admin
                    </Link>
                )}

                <div className="navbar__mobile-actions">
                    {user ? (
                        <button
                            className="navbar__btn navbar__btn--ghost"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="navbar__btn navbar__btn--ghost"
                                onClick={() => {
                                    setIsOpen(false);
                                    scrollToTop();
                                }}
                            >
                                Log In
                            </Link>

                            <Link
                                to="/signup"
                                className="navbar__btn navbar__btn--primary"
                                onClick={() => {
                                    setIsOpen(false);
                                    scrollToTop();
                                }}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}