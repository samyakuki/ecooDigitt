import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then((res) => setUsers(res.data.users))
      .catch((err) => {
        alert("Access denied or error fetching users");
        window.location.href = "/dashboard";
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Admin Panel - User Overview</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Affiliate</th>
            <th>Green Points</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAffiliate ? "✅" : "❌"}</td>
              <td>{u.greenPoints || 0}</td>
              <td>{u.isAdmin ? "🛡️ Yes" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
