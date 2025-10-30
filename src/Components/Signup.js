import React, { useState } from "react";
import "./Signup.css";
import { Mail, Lock, User, Chrome, ArrowRight, Eye, EyeOff, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../Contexts/AuthContext';

const Signup = () => {
  const {signUp, signInWithGoogle, completeProfile} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [tempGoogleUser, setTempGoogleUser] = useState(null);
  const [errors, setErrors] = useState({ 
    username: "", 
    email: "", 
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    general: ""
  });

  const validate = (isProfileCompletion = false) => {
    const nextErrors = { username: "", email: "", phoneNumber: "", password: "", confirmPassword: "", general: "" };
    
    if (formData.username.trim().length < 3) {
      nextErrors.username = "Username must be at least 3 characters";
    }
    
    if (formData.phoneNumber.trim().length < 10) {
      nextErrors.phoneNumber = "Enter a valid phone number";
    }
    
    if (!isProfileCompletion) {
      const emailOk = /.+@.+\..+/.test(formData.email.trim());
      if (!emailOk) {
        nextErrors.email = "Enter a valid email address";
      }
      
      if (formData.password.trim().length < 6) {
        nextErrors.password = "Password must be at least 6 characters";
      }
      
      if (formData.password !== formData.confirmPassword) {
        nextErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(nextErrors);
    
    if (isProfileCompletion) {
      return !nextErrors.username && !nextErrors.phoneNumber;
    }
    
    return !nextErrors.username && !nextErrors.email && !nextErrors.phoneNumber && !nextErrors.password && !nextErrors.confirmPassword;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      await signUp(formData.email, formData.password, formData.username, formData.phoneNumber);
      console.log("✅ User registered successfully");
      navigate("/");
    } catch (error) {
      console.error("❌ Signup failed:", error);
      setErrors((prev) => ({
        ...prev,
        general: error.response?.data?.message || error.message || "An error occurred during registration",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      const result = await signInWithGoogle();
      
      if (result.requiresProfile) {
        // User needs to complete profile with username and phone
        setShowProfileCompletion(true);
        setTempGoogleUser(result.tempUser);
      } else {
        // User already exists, redirect to home
        console.log("✅ Logged in with Google");
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Google sign-in failed:", error);
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Google sign-in failed",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteProfile = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!validate(true)) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      await completeProfile(formData.username, formData.phoneNumber);
      console.log("✅ Profile completed");
      navigate("/");
    } catch (error) {
      console.error("❌ Profile completion failed:", error);
      setErrors((prev) => ({
        ...prev,
        general: error.response?.data?.message || error.message || "Failed to complete profile",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };


  const signupBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  // If showing profile completion form
  if (showProfileCompletion && tempGoogleUser) {
    return (
      <div className="signup-page" style={signupBackgroundStyle}>
        <div className="signup-container">
          <div className="signup-left">
            <div className="signup-image" />
            <div className="signup-left-content">
              <h2>Almost There!</h2>
              <p>Just a few more details to complete your profile.</p>
            </div>
          </div>
          <div className="signup-right">
            <div className="signup-form">
              <div className="signup-header">
                <h1>Complete Your Profile</h1>
                <p>Welcome, {tempGoogleUser.displayName}!</p>
              </div>

              <form onSubmit={handleCompleteProfile} noValidate>
                {errors.general && (
                  <div className="signup-error-message">{errors.general}</div>
                )}

                <div className="signup-form-fields">
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className={`signup-input${errors.username ? " error" : ""}`}
                      required
                    />
                  </div>
                  {errors.username && <p className="input-error">{errors.username}</p>}

                  <div className="input-group">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`signup-input${errors.phoneNumber ? " error" : ""}`}
                      required
                    />
                  </div>
                  {errors.phoneNumber && <p className="input-error">{errors.phoneNumber}</p>}
                </div>

                <button
                  type="submit"
                  className="signup-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Completing..." : "Complete Profile"}
                  <ArrowRight size={18} className="signup-button-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page" style={signupBackgroundStyle}>
      <div className="signup-container">
        <div className="signup-left">
          <div className="signup-image" />
          <div className="signup-left-content">
            <h2>Join GoGrub Today</h2>
            <p>
              Create your account and start enjoying delicious meals delivered
              right to your doorstep.
            </p>
          </div>
        </div>
        <div className="signup-right">
          <div className="signup-form">
            <div className="signup-header">
              <h1>Create Account</h1>
              <p>Sign up to get started with GoGrub.</p>
            </div>

            <button
              type="button"
              className="google-button"
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
            >
              <Chrome size={18} className="google-icon" />
              Continue with Google
            </button>

            <div className="login-divider">
              <span>or sign up with email</span>
            </div>

            <form onSubmit={handleSignup} noValidate>
              {errors.general && (
                <div className="signup-error-message">
                  {errors.general}
                </div>
              )}
              
              <div className="signup-form-fields">
                <div className="input-group">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className={`signup-input${errors.username ? " error" : ""}`}
                    autoComplete="username"
                    required
                  />
                </div>
                {errors.username && (
                  <p className="input-error">{errors.username}</p>
                )}

                <div className="input-group">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`signup-input${errors.email ? " error" : ""}`}
                    autoComplete="email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="input-error">{errors.email}</p>
                )}

                <div className="input-group">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`signup-input${errors.phoneNumber ? " error" : ""}`}
                    autoComplete="tel"
                    required
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="input-error">{errors.phoneNumber}</p>
                )}

                <div className="input-group">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`signup-input password-input${errors.password ? " error" : ""}`}
                    autoComplete="new-password"
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
                {errors.password && (
                  <p className="input-error">{errors.password}</p>
                )}

                <div className="input-group">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={`signup-input password-input${errors.confirmPassword ? " error" : ""}`}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirmPassword((v) => !v)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="input-error">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="signup-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
                <ArrowRight size={18} className="signup-button-icon" />
              </button>
            </form>

            <div className="login-link">
              Already have an account?{" "}
              <button 
                type="button" 
                className="login-text"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

