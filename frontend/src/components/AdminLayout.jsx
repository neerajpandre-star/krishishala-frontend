import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  Home,
  FileText,
  Layers,
  Settings,
  User,
  LogOut,
} from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("user"); 
    navigate("/login");
  };

  // Close sidebar after clicking a link
  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold flex items-center gap-2">
             Admin Panel
          </h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2">
          <Link
            to="/admin"
            onClick={handleLinkClick}
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <Home size={20} /> Dashboard
          </Link>

          <Link
            to="/admin/papers"
            onClick={handleLinkClick}
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <FileText size={20} /> Papers
          </Link>

          <Link
            to="/admin/questions"
            onClick={handleLinkClick}
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <Layers size={20} /> Questions
          </Link>

          <Link
            to="/admin/results"
            onClick={handleLinkClick}
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <Settings size={20} /> Upload files
          </Link>
        </nav>

        {/* Admin Profile + Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={20} />
            <span>Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 hover:text-red-400"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-gray-100 p-4 border-b">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h2 className="font-bold text-lg">Welcome, Admin</h2>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
