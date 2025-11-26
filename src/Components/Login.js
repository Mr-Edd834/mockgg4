import React, { useEffect, useState } from "react";
import "./Login.css";
import { Mail, Lock, Chrome, ArrowRight, Eye, EyeOff } from "lucide-react";
import {useAuth} from '../Contexts/AuthContext';
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const {login, signInWithGoogle} = useAuth();

  useEffect(() => { 
    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem("gg_saved_email");
    const savedRemember = localStorage.getItem("gg_remember_me") === "true";
    if (savedEmail && savedRemember) {
      setCredentials((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, [navigate]);

  const validate = () => {
    const nextErrors = { email: "", password: "" };
    const emailOk = /.+@.+\..+/.test(credentials.email.trim());
    if (!emailOk) {
      nextErrors.email = "Enter a valid email address";
    }
    if (credentials.password.trim().length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }
    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleGoogleSignIn = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setLoginError("");

    try {
      const result = await signInWithGoogle();
      
      if (result.requiresProfile) {
        // User needs to complete profile, redirect to signup
        navigate("/signup");
      } else {
        // User already exists, redirect to home
        console.log("✅ Logged in with Google");
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Google sign-in failed:", error);
      setLoginError( "Google sign-in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailSignIn = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setLoginError("");

    try {
      await login(credentials.email, credentials.password);
      
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem("gg_saved_email", credentials.email);
        localStorage.setItem("gg_remember_me", "true");
      } else {
        localStorage.removeItem("gg_saved_email");
        localStorage.removeItem("gg_remember_me");
      }
      
      console.log("✅ Login successful");
      navigate("/");
    } catch (error) {
      console.error("❌ Login failed:", error);
      setLoginError("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  return (
      <div className="login-page" style={loginBackgroundStyle}>
      <div className="login-container">
        <div className="login-left">
          <div className="login-image" />
          <div className="login-left-content">
            <h2>Fuel your cravings</h2>
            <p>
              Log in to unlock curated meals, speedy delivery, and your saved
              favourites.
            </p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-form">
            <div className="login-header">
              <h1>Welcome back</h1>
              <p>Log in to keep your orders moving.</p>
            </div>

            <button
              type="button"
              className="google-button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
            >
              <Chrome size={18} className="google-icon" />
              Continue with Google
            </button>

            <div className="login-divider">
              <span>or log in with email</span>
            </div>

            <form onSubmit={handleEmailSignIn} noValidate>
              {loginError && (
                <div className="login-error-message">
                  {loginError}
                </div>
              )}
              <div className="login-form-fields">
                <div className="input-group">
                  <Mail size={18} color='red' className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`login-input${errors.email ? " error" : ""}`}
                    autoComplete="email"
                    required
                  />
                </div>
                {errors.email ? (
                  <p className="input-error">{errors.email}</p>
                ) : null}
                <div className="input-group">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`login-input password-input${errors.password ? " error" : ""}`}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password ? (
                  <p className="input-error">{errors.password}</p>
                ) : null}
              </div>

              <div className="login-aux">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <div className="forgot-password">
                  <button type="button" className="forgot-link" onClick={() => navigate("/forgot-password")}>
                    <Link to="/forgot-password">
                    Forgot password?
                    </Link>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
                <ArrowRight size={18} className="login-button-icon" />
              </button>
            </form>

            <div className="signup-link">
              New to GoGrub?{" "}
              <button 
                type="button" 
                className="signup-text"
                onClick={() => navigate("/signup")}
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
