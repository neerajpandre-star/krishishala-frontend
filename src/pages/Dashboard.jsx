import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const dummyProgress = [
  { name: "Test 1", score: 45 },
  { name: "Test 2", score: 58 },
  { name: "Test 3", score: 64 },
  { name: "Test 4", score: 72 },
  { name: "Test 5", score: 81 },
];

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    totalTests: 0,
    avgScore: 0,
    accuracy: 0,
    strong: "Quantitative Aptitude",
    weak: "General Awareness",
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    //🔌 Later connect to backend:
     axios.get("/api/results/me")

    setStats({
      totalTests: 12,
      avgScore: 72,
      accuracy: 64,
      strong: "Quantitative Aptitude",
      weak: "English",
    });

    setRecent([
      { title: "SSC Mock Test 12", score: "78%" },
      { title: "Banking Mock Test 5", score: "71%" },
      { title: "Railway Mock Test 2", score: "65%" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back,{" "}
            <span className="text-emerald-400">
              {user?.name || "Student"}
            </span>{" "}
            👋
          </h1>
          <p className="text-neutral-400 text-sm">
            Track your performance & stay exam-ready.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Tests Attempted" value={stats.totalTests} />
          <StatCard title="Average Score" value={`${stats.avgScore}%`} />
          <StatCard title="Accuracy" value={`${stats.accuracy}%`} />
          <StatCard title="Mock Rank" value="#1523" />
        </div>

        {/* Graph + Insights */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Progress Chart */}
          <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h2 className="font-semibold mb-3">📈 Progress Over Time</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyProgress}>
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Strong / Weak */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">📊 Subject Insights</h2>

            <div>
              <p className="text-sm text-neutral-400">Strong Subject</p>
              <p className="text-emerald-400 font-semibold">
                {stats.strong}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-400">Weak Subject</p>
              <p className="text-red-400 font-semibold">
                {stats.weak}
              </p>
            </div>

            <button className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 transition rounded-lg py-2">
              🚀 Start New Mock Test
            </button>
          </div>
        </div>

        {/* Recent Tests */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <h2 className="font-semibold mb-3">🕒 Recent Activity</h2>

          <div className="space-y-3">
            {recent.map((r, i) => (
              <div
                key={i}
                className="flex justify-between bg-neutral-800 rounded-lg p-3"
              >
                <span>{r.title}</span>
                <span className="text-emerald-400 font-medium">
                  {r.score}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
      <p className="text-neutral-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-emerald-400">{value}</p>
    </div>
  );
}
