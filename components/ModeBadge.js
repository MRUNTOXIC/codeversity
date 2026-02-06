export default function ModeBadge({ mode }) {
  const isVent = mode === "vent";

  return (
    <span
      className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
        isVent
          ? "bg-blue-100 text-blue-800"
          : "bg-green-100 text-green-800"
      }`}
    >
      {isVent ? "Rant Room" : "Reflect & Calm"}
    </span>
  );
}