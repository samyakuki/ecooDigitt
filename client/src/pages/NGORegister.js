import { useState } from "react";
import axios from "axios";

const NGORegister = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    contactEmail: "",
  });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/ngo/register", form);
      setMsg("NGO submitted for approval!");
    } catch {
      setMsg("Submission failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register Your NGO</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" onChange={e => setForm({ ...form, contactEmail: e.target.value })} required />
        <input placeholder="Website" onChange={e => setForm({ ...form, website: e.target.value })} />
        <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <br />
        <button type="submit">Submit</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default NGORegister;
