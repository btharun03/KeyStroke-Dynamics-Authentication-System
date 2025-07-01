import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="container dashboard-container">
      <h1>KeyStroke Dynamics Authentication System</h1>
      <h2>Welcome to the Dashboard</h2>
      <p>You are successfully authenticated using Keystroke Dynamics!</p>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;