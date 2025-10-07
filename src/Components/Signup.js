import React, { useState } from "react";
import "./Signup.css";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import authService from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: "",
    general: ""
  });

  const validate = () => {
    const nextErrors = { name: "", email: "", password: "", confirmPassword: "", general: "" };
    
    if (formData.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters";
    }
    
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
    
    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.password && !nextErrors.confirmPassword;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      const result = await authService.register(
        formData.email,
        formData.password,
        formData.name
      );

      if (result.success) {
        console.log("Registration successful", result.user);
        // User is automatically logged in after registration
        // Redirect to home page
        navigate("/");
      } else {
        setErrors((prev) => ({ 
          ...prev, 
          general: result.message || "Registration failed" 
        }));
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors((prev) => ({ 
        ...prev, 
        general: error.message || "An error occurred during registration" 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const signupBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={`signup-input${errors.name ? " error" : ""}`}
                    autoComplete="name"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="input-error">{errors.name}</p>
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
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

