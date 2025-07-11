import { useEffect, useState } from "react";
import API from "./api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
   
  useEffect(() => {
  axios.get("http://localhost:5000/api/ngo/approved").then(res => {
    setNgos(res.data.ngos);
  });
}, []);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile");
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        setMessage("⛔ Session expired. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    };

    fetchProfile();
  }, []);

  const toggleAffiliate = async () => {
    try {
      const res = await API.post("/user/toggle-affiliate");
      setUser({ ...user, isAffiliate: !user.isAffiliate });
      setMessage(res.data.message);
    } catch {
      setMessage("⚠️ Could not update affiliate status.");
    }
  };

  const submitCategory = async (category) => {
    try {
      const res = await API.post("/user/submit", { category });
      setUser({ ...user, greenPoints: res.data.greenPoints });
      setMessage(res.data.message);
    } catch {
      setMessage("⚠️ Error submitting recycling action.");
    }
  };

  if (loading) return <p style={{ fontSize: "1.2rem" }}>🔄 Loading your dashboard...</p>;

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>
        Welcome, {user.name}{" "}
        {user.isAffiliate && <span style={{ color: "green", fontSize: "0.9rem" }}>🌿 Affiliate</span>}
      </h2>
      <p>Email: {user.email}</p>
      <p>Green Points: 🟢 {user.greenPoints || 0}</p>
      <p>
        Affiliate Status: {user.isAffiliate ? "✅ Yes" : "❌ No"}
        <button
          onClick={toggleAffiliate}
          style={{
            marginLeft: "1rem",
            padding: "0.3rem 0.6rem",
            cursor: "pointer",
            backgroundColor: "#e0ffe0",
            border: "1px solid #008000",
            borderRadius: "5px",
          }}
        >
          Toggle Affiliate
        </button>
      </p>

      <h3>♻️ Submit Recycling Category:</h3>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => submitCategory("plastic")}>🧴 Plastic</button>
        <button onClick={() => submitCategory("paper")}>📄 Paper</button>
        <button onClick={() => submitCategory("e-waste")}>⚡ E-Waste</button>
      </div>

      {message && (
        <p style={{ color: "green", fontWeight: "bold", fontSize: "1rem" }}>{message}</p>
      )}
    </div>
  );
};

export default Dashboard;
