import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [keystrokeData, setKeystrokeData] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    setKeystrokeData(prev => [...prev, { key: e.key, time: Date.now(), event: "down" }]);
  };

  const handleKeyUp = (e) => {
    setKeystrokeData(prev => [...prev, { key: e.key, time: Date.now(), event: "up" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData.username, formData.password, keystrokeData);
      if (response.data.success) {
        toast.success("✅ Login successful!", { position: "top-center" });
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error("❌ Invalid credentials or keystroke mismatch", { position: "top-center" });
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Keystroke authentication failed. Try again.";
      toast.error(`❌ ${msg}`, { position: "top-center" });
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>KeyStroke Dynamics Authentication System</h1>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p className="link" onClick={() => navigate("/register")}>
        Dont have an account? Register
      </p>
    </div>
  );
};

export default Login;
