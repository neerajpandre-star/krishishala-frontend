import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Navbar profile load failed", err);
      }
    };

    fetchMe();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm relative z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded hover:bg-gray-100"
            >
              ☰
            </button>
            <div className="font-bold text-lg">KRISHISHALA</div>
          </div>

          {/* Center Links */}
          {user && (
            <div className="hidden md:flex gap-6 items-center">
              <Link to="/dashboard">Overview</Link>
              <Link to="/resources">Resources</Link>
              <Link to="/previous-year-papers">Previous Papers</Link>
              <Link to="/tests">Mock Tests</Link>

              {user.role === "admin" && <Link to="/admin">Admin Panel</Link>}
            </div>
          )}

          {/* Right: Profile */}
          <div className="flex items-center gap-3">
            {!user && <Link to="/login" className="text-blue-600">Login</Link>}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-9 h-9 rounded-full overflow-hidden border"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}`}
                    alt="profile"
                    className="w-full h-full"
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border p-4 z-50">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${user.name}`}
                        className="w-12 h-12 rounded-full"
                        alt=""
                      />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>

                    <p>📊 Score: <b>{user.score ?? 0}</b></p>
                    <p>⏱️ Hours Spent: <b>{user.hoursSpent ?? 0}</b></p>

                    <button
                      onClick={logout}
                      className="w-full mt-3 py-2 bg-red-100 text-red-600 rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="relative w-64 bg-white h-full shadow-xl p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="mb-4 text-sm text-gray-500"
            >
              ✖ Close
            </button>

            <nav className="space-y-2">
              <Link 
                  to="/dashboard" 
                    onClick={() => setSidebarOpen(false)}
                     className="flex items-center gap-2 px-3 py-1 hover:bg-gray-200 rounded"
                    > 
                📊 Overview
              </Link>
              <Link 
                  to="/resources" 
                    onClick={() => setSidebarOpen(false)}
                     className="flex items-center gap-2 px-3 py-1 hover:bg-gray-200 rounded"
                  >
                📚 Resources
              </Link>
              <Link 
                  to="/previous-year-papers" 
                   onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-2 px-3 py-1 hover:bg-gray-200 rounded"
                  >
               📝 Previous Year Papers
              </Link>
              <Link
                 to="/student/mocktests" // Route to the student mock test list page
                  onClick={() => setSidebarOpen(false)}
                   className="flex items-center gap-2 px-3 py-1 hover:bg-gray-200 rounded"
                   >
               🧪 Mock Tests
              </Link>


              {user?.role === "admin" && (
                <Link to="/admin" onClick={() => setSidebarOpen(false)}>🛠 Admin Panel</Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
