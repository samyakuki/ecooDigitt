import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        alert("Not authorized, please log in.");
        window.location.href = "/login";
      }
    };

    getProfile();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.id}</h2>
          <p>This is protected data!</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
