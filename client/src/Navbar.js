import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={{ backgroundColor: "#f0f0f0", padding: "1rem" }}>
      <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
