export default function WarningCard({ title, children }) {
  return (
    <div className="border border-yellow-400 bg-yellow-50 rounded-lg p-4 text-sm">
      <h2 className="font-semibold mb-2 text-yellow-800">{title}</h2>
      <div className="text-yellow-700">{children}</div>
    </div>
  );
}
