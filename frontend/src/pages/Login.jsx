import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // toggle
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // Save token + user
      localStorage.setItem("token", token);
      localStorage.setItem("examPreference", user.examPreference);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isAdmin ? "Admin Login" : "Student Login"}
        </h2>

        {/* Toggle */}
        <div className="flex justify-center mb-4 space-x-2">
          <button
            type="button"
            className={`px-4 py-1 rounded ${
              !isAdmin ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsAdmin(false)}
          >
            Student
          </button>
          <button
            type="button"
            className={`px-4 py-1 rounded ${
              isAdmin ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
        </div>

        {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        {!isAdmin && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        )}
      </form>
    </div>
  );
}
