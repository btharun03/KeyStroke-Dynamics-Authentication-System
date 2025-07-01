import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [keystrokeData, setKeystrokeData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    setKeystrokeData([...keystrokeData, { key: e.key, time: Date.now(), event: "down" }]);
  };

  const handleKeyUp = (e) => {
    setKeystrokeData([...keystrokeData, { key: e.key, time: Date.now(), event: "up" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(
        formData.username,
        formData.email,
        formData.phone,
        formData.password,
        keystrokeData,
        0
      );
      navigate("/login"); // Redirect after success
    } catch (err) {
      console.error("Register Error:", err);
      const message = err.response?.data?.message || "Registration failed. Try again.";
      setError(message);
    }
  };

  return (
    <div className="container">
      <h1>KeyStroke Dynamics Authentication System</h1>
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <button type="submit">Register</button>
      </form>

      <p className="link" onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "blue" }}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default Register;