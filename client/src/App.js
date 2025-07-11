import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import NGORegister from "./pages/NGORegister";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Login />} />

        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* NGO Public Route */}
        <Route path="/ngo/register" element={<NGORegister />} />
         <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
