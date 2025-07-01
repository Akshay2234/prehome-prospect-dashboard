import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotMessage, setForgotMessage] = useState("");
  const navigate = useNavigate();

  // Email/Password Login
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://13.204.83.61:5000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.userId);
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  // Google Login
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const response = await axios.post("http://13.204.83.61:5000/api/auth/google-login", { email: decoded.email });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.userId);
      localStorage.setItem("user_email", decoded.email);
      if (response.data.isGoogleAccount) {
        navigate("/set-password");
      } else {
        navigate("/dashboard");
      }
    } catch {
      alert("Google Login failed");
    }
  };

  // Facebook Login
  const handleFacebookResponse = async ({ provider, data }) => {
    try {
      const fbResponse = await axios.post("http://13.204.83.61:5000/api/auth/facebook-login", {
        userID: data.id
      });
      localStorage.setItem("token", fbResponse.data.token);
      localStorage.setItem("user_id", fbResponse.data.userId);
      navigate("/dashboard");
    } catch {
      alert("Facebook Login Failed");
    }
  };

  // Forgot Password Step 1: Send OTP
  const handleForgotSubmit = async () => {
    try {
      const res = await axios.post("http://13.204.83.61:5000/api/auth/forgot-password", { email: forgotEmail });
      setForgotMessage(res.data.message || "OTP sent to email");
      setForgotStep(2);
    } catch {
      setForgotMessage("Failed to send OTP");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://13.204.83.61:5000/api/auth/verify-reset-otp", { email: forgotEmail, otp });
      setForgotMessage(res.data.message || "OTP verified");
      setForgotStep(3);
    } catch {
      setForgotMessage("Invalid OTP");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    try {
      const res = await axios.post("http://13.204.83.61:5000/api/auth/reset-password", { email: forgotEmail, password: newPassword });
      setForgotMessage(res.data.message || "Password reset successfully");
      setTimeout(() => {
        setShowForgot(false);
        setForgotStep(1);
        setForgotMessage("");
        setForgotEmail("");
        setOtp("");
        setNewPassword("");
      }, 2000);
    } catch {
      setForgotMessage("Failed to reset password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>{showForgot ? "Forgot Password" : "Login"}</h2>

        {!showForgot ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <p style={styles.forgotText}>
              <span onClick={() => setShowForgot(true)} style={styles.forgotLink}>Forgot Password?</span>
            </p>
            <button onClick={handleLogin} style={styles.button}>Login</button>

            <p style={styles.orText}>OR</p>
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => alert("Google login failed")} />
            <p style={styles.orText}>OR</p>
            <LoginSocialFacebook
              appId="997130395950749"
              onResolve={handleFacebookResponse}
              onReject={() => alert("Facebook Login Failed")}
            >
              <FacebookLoginButton text="Login with Meta" />
            </LoginSocialFacebook>

            <p style={styles.signupText}>
              Don't have an account?{" "}
              <Link to="/signup" style={styles.signupLink}>Sign Up</Link>
            </p>
          </>
        ) : (
          <>
            {forgotStep === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  style={styles.input}
                />
                <button onClick={handleForgotSubmit} style={styles.button}>Send OTP</button>
              </>
            )}
            {forgotStep === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={styles.input}
                />
                <button onClick={handleVerifyOtp} style={styles.button}>Verify OTP</button>
              </>
            )}
            {forgotStep === 3 && (
              <>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={styles.input}
                />
                <button onClick={handleResetPassword} style={styles.button}>Reset Password</button>
              </>
            )}

            <p style={styles.info}>{forgotMessage}</p>
            <p style={styles.forgotText}>
              <span onClick={() => {
                setShowForgot(false);
                setForgotStep(1);
                setForgotEmail("");
                setOtp("");
                setNewPassword("");
                setForgotMessage("");
              }} style={styles.forgotLink}>Back to Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f5f7",
  },
  formBox: {
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  forgotText: {
    textAlign: "right",
    marginBottom: "15px",
    fontSize: "14px",
  },
  forgotLink: {
    color: "#1976d2",
    textDecoration: "underline",
    fontWeight: "normal",
    cursor: "pointer",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  orText: {
    textAlign: "center",
    margin: "15px 0",
    fontSize: "14px",
    color: "#999",
  },
  signupText: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
  },
  signupLink: {
    color: "#1976d2",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  info: {
    textAlign: "center",
    color: "#1976d2",
    fontSize: "14px",
    marginTop: "10px",
  }
};

export default Login;
