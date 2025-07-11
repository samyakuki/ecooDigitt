import { useState, useEffect } from "react";
import API from "./api";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then(res => setUsers(res.data.users));
    API.get("/admin/ngos").then(res => setNgos(res.data.ngos));
  }, []);

  const approveNGO = async (id, status) => {
    await API.post(`/admin/ngos/${id}/approve`, { approved: status });
    const updated = await API.get("/admin/ngos");
    setNgos(updated.data.ngos);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Admin Panel</h2>

      <h3>Registered Users</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Affiliate</th><th>Points</th><th>Admin</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAffiliate ? "✅" : "❌"}</td>
              <td>{u.greenPoints || 0}</td>
              <td>{u.isAdmin ? "🛡️" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>NGO Requests</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Website</th><th>Approved</th><th>Action</th></tr>
        </thead>
        <tbody>
          {ngos.map(ngo => (
            <tr key={ngo._id}>
              <td>{ngo.name}</td>
              <td>{ngo.contactEmail}</td>
              <td>{ngo.website}</td>
              <td>{ngo.approved ? "✅" : "❌"}</td>
              <td>
                {!ngo.approved && (
                  <button onClick={() => approveNGO(ngo._id, true)}>Approve</button>
                )}
                {ngo.approved && (
                  <button onClick={() => approveNGO(ngo._id, false)}>Revoke</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
