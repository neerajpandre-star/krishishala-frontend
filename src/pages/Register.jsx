import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [examPreference, setExamPreference] = useState("");
  const [error, setError] = useState("");

  // Predefined exam list
  const possibleExams = ["JEE", "NEET", "SSC", "PAT", "CUET", "CAT"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!examPreference) {
      setError("Please select your exam preference");
      return;
    }

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        examPreference,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Exam Preference Dropdown */}
        <select
          value={examPreference}
          onChange={(e) => setExamPreference(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        >
          <option value="">-- Select Exam Preference --</option>
          {possibleExams.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Create Account
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
