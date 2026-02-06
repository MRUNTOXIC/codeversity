"use client";
import { useState } from "react";

export default function TestAPI() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: "Hello, are you working?", 
          mode: "test" 
        })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
      console.error('API Test Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">API Test</h1>
      <button 
        onClick={testAPI}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Testing..." : "Test Gemini API"}
      </button>
      
      {response && (
        <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto text-black">
          {response}
        </pre>
      )}
    </div>
  );
}