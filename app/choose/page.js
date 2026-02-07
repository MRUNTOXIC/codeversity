"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { MindSpaceLogo, VentIcon, ReflectIcon } from "@/components/Icons";

export default function Choose() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="border-b px-6 py-4 backdrop-blur-md" style={{
        background: theme === 'dark' 
          ? 'rgba(15, 23, 42, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        borderColor: 'var(--border)'
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MindSpaceLogo className="w-8 h-8" />
            <span className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>MindSpace</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            How are you feeling today?
          </h2>
          <p className="text-lg mb-12" style={{ color: 'var(--text-secondary)' }}>
            Choose the support that feels right for you
          </p>

          <div className="grid md:grid-cols-2 gap-6 w-full max-w-xl">
            {/* Vent Option */}
            <div 
              onClick={() => router.push("/vent")}
              className="card group cursor-pointer hover:shadow-lg transform transition-all duration-300 hover:-translate-y-2"
              style={{
                border: '2px solid transparent',
                borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1'
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}>
                  <VentIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Vent Room
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                I need to let it all out
              </p>
              <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                Express freely, no judgment
              </p>
            </div>

            {/* Reflect & Calm Option */}
            <div 
              onClick={() => router.push("/reflect")}
              className="card group cursor-pointer hover:shadow-lg transform transition-all duration-300 hover:-translate-y-2"
              style={{
                border: '2px solid transparent',
                borderImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%) 1'
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                }}>
                  <ReflectIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Reflect & Calm
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Help me process and find peace
              </p>
              <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                Explore deeper, find clarity
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <button
              onClick={() => router.back()}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}