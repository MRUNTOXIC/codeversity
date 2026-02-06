"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="app-container">
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className="animate-fadeIn">
            <div className="avatar w-16 h-16 mx-auto mb-6">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">MindSpace</h1>
            <p className="text-lg mb-8" style={{color: 'var(--text-secondary)'}}>A safe space for your thoughts and feelings</p>
            
            <div className="grid gap-4 mb-8 max-w-md mx-auto">
              <div className="card">
                <h3 className="font-medium mb-1">🌱 Vent</h3>
                <p className="text-sm" style={{color: 'var(--text-secondary)'}}>Express your feelings freely</p>
              </div>
              <div className="card">
                <h3 className="font-medium mb-1">🤔 Reflect</h3>
                <p className="text-sm" style={{color: 'var(--text-secondary)'}}>Explore your thoughts deeply</p>
              </div>
              <div className="card">
                <h3 className="font-medium mb-1">🧘 Calm</h3>
                <p className="text-sm" style={{color: 'var(--text-secondary)'}}>Find peace and relaxation</p>
              </div>
            </div>
            
            <button
              onClick={() => router.push("/warning")}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}