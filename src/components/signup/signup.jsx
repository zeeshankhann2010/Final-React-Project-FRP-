import React, { useState } from "react";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";

function Signup() {
  // ---------- Text Content ----------
  const heading = "Create Account";
  const subheading = "Join our community and help save lives.";
  const illustrationCaption = "Your donation can save up to 3 lives. Join us today.";

  // ---------- Form States ----------
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // ---------- Submit Handler ----------
  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Submit clicked");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!agreed) {
      alert("Please agree to the Terms & Privacy Policy");
      return;
    }

    try {

      console.log("Creating Firebase user...");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User Created:", userCredential.user.uid);


      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName: fullName,
        email: email,
        role: "user",
        createdAt: new Date(),
      });


      console.log("Firestore Added");

      alert("Account created successfully!");


    } catch (error) {

      console.log("Firebase Error Code:", error.code);
      console.log("Firebase Error Message:", error.message);

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered!");
      }

      else if (error.code === "auth/weak-password") {
        alert("Password must be at least 6 characters!");
      }

      else if (error.code === "auth/invalid-email") {
        alert("Invalid email address!");
      }

      else if (error.code === "auth/operation-not-allowed") {
        alert("Email/Password authentication is not enabled in Firebase!");
      }

      else {
        alert(error.code);
      }
    }
  }

  return (
    <section className="signup">
      <div className="signup__container">

        {/* ---------- LEFT SIDE: FORM ---------- */}
        <div className="signup__form-side">

          {/* Logo */}
          <div className="signup__brand">
            <i className="fa-solid fa-droplet signup__brand-icon"></i>
            <span className="signup__brand-name">BloodBank</span>
          </div>

          {/* Heading */}
          <h1 className="signup__heading">{heading}</h1>
          <p className="signup__subheading">{subheading}</p>

          {/* Form */}
          <form className="signup__form" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="signup__field">
              <label className="signup__label" htmlFor="fullName">Full Name</label>
              <div className="signup__input-wrapper">
                <i className="fa-solid fa-user signup__input-icon"></i>
                <input
                  type="text"
                  id="fullName"
                  className="signup__input"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="signup__field">
              <label className="signup__label" htmlFor="email">Email Address</label>
              <div className="signup__input-wrapper">
                <i className="fa-solid fa-envelope signup__input-icon"></i>
                <input
                  type="email"
                  id="email"
                  className="signup__input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="signup__field">
              <label className="signup__label" htmlFor="password">Password</label>
              <div className="signup__input-wrapper">
                <i className="fa-solid fa-lock signup__input-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="signup__input"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="signup__toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="signup__field">
              <label className="signup__label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="signup__input-wrapper">
                <i className="fa-solid fa-lock signup__input-icon"></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="signup__input"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="signup__toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={showConfirmPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="signup__terms">
              <input
                type="checkbox"
                className="signup__checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I agree to the <a href="#terms" className="signup__terms-link">Terms & Privacy Policy</a>
              </span>
            </label>

            {/* Submit Button */}
            <button type="submit" className="signup__submit-btn">Create Account</button>
          </form>

          {/* Bottom Link */}
          <p className="signup__login-text">
            Already have an account?{" "}
            <a href="/login" className="signup__login-link">Log In</a>
          </p>
        </div>

        {/* ---------- RIGHT SIDE: ILLUSTRATION ---------- */}
        <div className="signup__illustration-side">
          <div className="signup__illustration-content">
            <i className="fa-solid fa-heart-pulse signup__illustration-icon"></i>
            <p className="signup__illustration-caption">{illustrationCaption}</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Signup;