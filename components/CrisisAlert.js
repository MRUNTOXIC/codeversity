'use client';

export default function CrisisAlert({ message, severity = 'medium' }) {
  const bgColor = severity === 'high' ? 'bg-red-100' : 'bg-yellow-50';
  const borderColor = severity === 'high' ? 'border-red-300' : 'border-yellow-200';
  const textColor = severity === 'high' ? 'text-red-900' : 'text-yellow-900';

  return (
    <div className={`${bgColor} ${borderColor} ${textColor} border rounded-lg p-4 mb-4 shadow-lg`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">🆘</div>
        <div className="flex-1">
          <h3 className="font-bold mb-2">We're Here for You</h3>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
