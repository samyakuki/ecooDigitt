import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../Navbar";

const AdminPanel = () => {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const res = await API.get("/admin/ngos");
        setNgos(res.data.ngos);
      } catch (err) {
        alert("Unauthorized or error fetching NGOs");
      }
    };
    fetchNgos();
  }, []);

  const handleApproval = async (id, approved) => {
    try {
      const res = await API.patch(`/admin/ngo/${id}`, { approved });
      alert(res.data.message);
      setNgos((prev) =>
        prev.map((ngo) => (ngo._id === id ? res.data.ngo : ngo))
      );
    } catch (err) {
      alert("Error updating NGO status");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <Navbar />
      <h2>Admin Panel - NGO Approvals</h2>
      {ngos.length === 0 ? (
        <p>No NGOs found.</p>
      ) : (
        ngos.map((ngo) => (
          <div
            key={ngo._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: ngo.approved ? "#e6ffe6" : "#fff",
            }}
          >
            <h3>{ngo.name}</h3>
            <p>Email: {ngo.email}</p>
            <p>Status: {ngo.approved ? "✅ Approved" : "⏳ Pending"}</p>
            {!ngo.approved && (
              <button onClick={() => handleApproval(ngo._id, true)}>
                ✅ Approve
              </button>
            )}
            {ngo.approved && (
              <button onClick={() => handleApproval(ngo._id, false)}>
                ❌ Revoke
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPanel;
