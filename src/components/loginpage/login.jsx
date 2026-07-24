import React from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const heading = "Welcome";
    const subheading = "Sign in to continue saving lives";
    const illustrationCaption =
        "Every login brings you closer to your next life-saving donation.";

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);

            alert("Login Successful!");
            navigate("/home");

        } catch (error) {
            console.log("Firebase Error:", error);

            let message = "";

            switch (error.code) {
                case "auth/invalid-credential":
                    message = "Email or password is incorrect!";
                    break;

                case "auth/user-not-found":
                    message = "No account found with this email!";
                    break;

                case "auth/wrong-password":
                    message = "Wrong password!";
                    break;

                case "auth/invalid-email":
                    message = "Invalid email address!";
                    break;

                case "auth/too-many-requests":
                    message = "Too many login attempts. Try again later!";
                    break;

                case "auth/network-request-failed":
                    message = "Network error. Check your internet connection!";
                    break;

                default:
                    message = error.message;
            }

            alert(message);
        }
    }

    return (
        <section className="login">
            <div className="login__container">

                <div className="login__form-side">

                    <div className="login__brand">
                        <i className="fa-solid fa-droplet login__brand-icon"></i>
                        <span className="login__brand-name">BloodBank</span>
                    </div>

                    <h1 className="login__heading">{heading}</h1>
                    <p className="login__subheading">{subheading}</p>

                    <form className="login__form" onSubmit={handleSubmit}>

                        <div className="login__field">
                            <label className="login__label">Email Address</label>
                            <div className="login__input-wrapper">
                                <i className="fa-solid fa-envelope login__input-icon"></i>

                                <input
                                    type="email"
                                    className="login__input"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="login__field">
                            <label className="login__label">Password</label>

                            <div className="login__input-wrapper">
                                <i className="fa-solid fa-lock login__input-icon"></i>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="login__input"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    className="login__toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i
                                        className={
                                            showPassword
                                                ? "fa-solid fa-eye"
                                                : "fa-solid fa-eye-slash"
                                        }
                                    ></i>
                                </button>
                            </div>
                        </div>

                        <div className="login__options">
                            <label className="login__remember">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>

                            <a href="#" className="login__forgot-link">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="login__submit-btn"
                        >
                            Sign In
                        </button>

                    </form>

                    <p className="login__signup-text">
                        Don't have an account?{" "}
                        <Link to="/signup" className="login__signup-link">
                            Create Account
                        </Link>
                    </p>

                </div>

                <div className="login__illustration-side">
                    <div className="login__illustration-content">
                        <i className="fa-solid fa-hand-holding-heart login__illustration-icon"></i>
                        <p className="login__illustration-caption">
                            {illustrationCaption}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Login;