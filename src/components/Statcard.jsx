// src/components/StatCard.jsx
export default function StatCard({ title, value }) {
  return (
    <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500 transition">
      <p className="text-neutral-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
