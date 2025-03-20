import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import loginside from '../../Photos/loginside.jpg';
import { baseUrl } from "@/urls";
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    const { storeTokeninLS } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/api/auth/login`, formData);

            const token = response.data.token;
            storeTokeninLS(token); 

            if (response.data.role === "warden") {
                navigate("/WardenDash");
            } else {
                navigate("/Homepage");
            }
        } catch (error) {
            console.error(error.response?.data || "Login failed");
            alert("Login failed");
        }
    };

    const handleForgotPassword = async () => {
        try {
            const email = formData.email;
            if (!email) {
                alert("Please enter your email to reset the password.");
                return;
            }            
            await axios.post(`${baseUrl}/api/pass_reset/forgot-password`, { email });
            alert("Password reset link has been sent to your email.");
            navigate('/otp-page');
        } catch (error) {
            console.error(error.response?.data || "Failed to send password reset link");
            alert("Failed to send password reset link");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-image">
                    <img src={loginside} alt="Login illustration" />
                </div>
                <div className="login-form-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2 className="login-title">Login</h2>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                        <button type="button" onClick={handleForgotPassword} className="forgot-button">
                            Forgot Password
                        </button>
                    </form>

                    <div className="signup-link">
                        <p>
                            Don't have an account? <a href="./SignUp">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
