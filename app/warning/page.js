"use client";

import { useRouter } from "next/navigation";

export default function WarningPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-2000"></div>
      </div>
      
      <div className="chat-container max-w-3xl w-full p-12 relative z-10">
        <div className="animate-fadeInUp text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Important Notice
          </h1>
          
          <div className="text-left space-y-6 mb-8">
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="font-bold text-red-600 mb-3">🚨 Crisis Support</h3>
              <p className="text-gray-700">If you're having thoughts of self-harm or suicide, please contact emergency services immediately or call a crisis hotline.</p>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="font-bold text-orange-600 mb-3">🤖 AI Limitations</h3>
              <p className="text-gray-700">This is an AI assistant, not a replacement for professional mental health care. For serious concerns, please consult a licensed therapist.</p>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="font-bold text-blue-600 mb-3">🔒 Privacy</h3>
              <p className="text-gray-700">Your conversations are processed to provide support but are not stored permanently. However, avoid sharing sensitive personal information.</p>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/terms")}
              className="glass-effect text-gray-700 px-6 py-3 rounded-2xl font-semibold transform transition-all hover:scale-105"
            >
              Read Terms
            </button>
            <button
              onClick={() => router.push("/choose")}
              className="message-user text-white px-8 py-3 rounded-2xl font-semibold transform transition-all hover:scale-105 shadow-xl"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}