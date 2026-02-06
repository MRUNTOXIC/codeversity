"use client";

import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen p-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-2000"></div>
      </div>
      
      <div className="chat-container max-w-4xl mx-auto p-12 relative z-10">
        <div className="animate-fadeInUp">
          <h1 className="text-4xl font-bold gradient-text mb-8 text-center">
            Terms & Conditions
          </h1>
          
          <div className="space-y-6 text-gray-700">
            <section className="glass-effect p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4">1. Service Description</h2>
              <p>MindSpace provides AI-powered mental wellness support through conversational interactions. This service is designed to offer emotional support and coping strategies.</p>
            </section>
            
            <section className="glass-effect p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4">2. Medical Disclaimer</h2>
              <p>This service does not provide medical advice, diagnosis, or treatment. It is not a substitute for professional mental health care. Always seek professional help for serious mental health concerns.</p>
            </section>
            
            <section className="glass-effect p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4">3. Privacy & Data</h2>
              <p>Conversations are processed to provide personalized responses. We do not store personal conversations permanently, but please avoid sharing sensitive personal information.</p>
            </section>
            
            <section className="glass-effect p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4">4. Crisis Situations</h2>
              <p>If you're experiencing a mental health crisis, please contact emergency services immediately. This service includes crisis detection but should not be relied upon as the sole means of crisis intervention.</p>
            </section>
            
            <section className="glass-effect p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4">5. User Responsibilities</h2>
              <p>Users must be 13+ years old. Use this service responsibly and do not share harmful content. Report any technical issues or concerns to support.</p>
            </section>
          </div>
          
          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={() => router.push("/warning")}
              className="glass-effect text-gray-700 px-6 py-3 rounded-2xl font-semibold transform transition-all hover:scale-105"
            >
              Back
            </button>
            <button
              onClick={() => router.push("/choose")}
              className="message-user text-white px-8 py-3 rounded-2xl font-semibold transform transition-all hover:scale-105 shadow-xl"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}