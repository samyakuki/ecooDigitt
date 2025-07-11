import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const NgoList = () => {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/ngo/approved")
      .then((res) => setNgos(res.data.ngos))
      .catch(() => alert("Failed to fetch NGO list"));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <Navbar />
      <h2>🌍 Our NGO Partners</h2>
      {ngos.length === 0 ? (
        <p>No approved NGOs yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {ngos.map((ngo) => (
            <li key={ngo._id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <h3>{ngo.name}</h3>
              <p><strong>Mission:</strong> {ngo.mission}</p>
              <p><strong>Website:</strong> <a href={ngo.website} target="_blank" rel="noreferrer">{ngo.website}</a></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NgoList;
