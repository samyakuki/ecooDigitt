import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile");
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        setMessage("⛔ Please login first.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    };
    fetchProfile();
  }, []);

  const toggleAffiliate = async () => {
    const res = await API.post("/user/toggle-affiliate");
    setUser({ ...user, isAffiliate: !user.isAffiliate });
    setMessage(res.data.message);
  };

  const submitCategory = async (category) => {
    const res = await API.post("/user/submit", { category });
    setUser({ ...user, greenPoints: res.data.greenPoints });
    setMessage(res.data.message);
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <Navbar />
      <h2>Welcome, {user.name} {user.isAffiliate && "🌿"}</h2>
      <p>Email: {user.email}</p>
      <p>Green Points: 🟢 {user.greenPoints || 0}</p>

      <button onClick={toggleAffiliate}>
        {user.isAffiliate ? "Disable Affiliate" : "Become an Affiliate"}
      </button>

      <h3>Submit Recycling:</h3>
      <button onClick={() => submitCategory("plastic")}>🧴 Plastic</button>
      <button onClick={() => submitCategory("paper")}>📄 Paper</button>
      <button onClick={() => submitCategory("e-waste")}>⚡ E-Waste</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default Dashboard;
