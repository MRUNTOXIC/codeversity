"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { MindSpaceLogo, VentIcon, ReflectIcon, CalmIcon, SparkleIcon } from "@/components/Icons";

export default function LandingPage() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div className="app-container min-h-screen overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10" style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafb 50%, #eff2f5 100%)',
        animation: 'gradient 15s ease infinite',
        backgroundSize: '200% 200%'
      }}>
        {/* Animated Blobs */}
        <div className="absolute top-0 -left-40 w-80 h-80 rounded-full opacity-20" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          animation: 'float 6s ease-in-out infinite',
          filter: 'blur(40px)'
        }}/>
        <div className="absolute bottom-0 -right-40 w-80 h-80 rounded-full opacity-20" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          animation: 'float 8s ease-in-out infinite reverse',
          filter: 'blur(40px)'
        }}/>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }
          50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }
        }
      `}</style>

      {/* Header with Theme Toggle */}
      <header className="relative z-20 flex items-center justify-between p-6 backdrop-blur-md" style={{
        background: theme === 'dark' 
          ? 'rgba(15, 23, 42, 0.7)'
          : 'rgba(255, 255, 255, 0.7)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="flex items-center gap-3">
          <MindSpaceLogo className="w-10 h-10" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            MindSpace
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full text-center animate-fadeIn">
          
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  animation: 'glow 3s ease-in-out infinite'
                }}>
                  <MindSpaceLogo className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Welcome to <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">MindSpace</span>
            </h1>
            <p className="text-xl md:text-2xl mb-2" style={{ color: 'var(--text-secondary)' }}>
              Your personal sanctuary for mental wellness
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              Express yourself freely, reflect deeply, and find peace within
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Vent Card */}
            <div className="group">
              <div className="card backdrop-blur-sm hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 cursor-pointer" 
                   onClick={() => router.push("/vent")}
                   style={{
                     border: '1px solid var(--border)',
                     background: theme === 'dark' 
                       ? 'rgba(30, 41, 59, 0.8)'
                       : 'rgba(255, 255, 255, 0.8)'
                   }}>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}>
                    <VentIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Vent
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Express your feelings freely without judgment. Let it all out in your safe space.
                </p>
              </div>
            </div>

            {/* Reflect Card */}
            <div className="group">
              <div className="card backdrop-blur-sm hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                   onClick={() => router.push("/reflect")}
                   style={{
                     border: '1px solid var(--border)',
                     background: theme === 'dark' 
                       ? 'rgba(30, 41, 59, 0.8)'
                       : 'rgba(255, 255, 255, 0.8)'
                   }}>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                  }}>
                    <ReflectIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Reflect
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Explore your thoughts deeply. Gain insights and understand yourself better.
                </p>
              </div>
            </div>

            {/* Calm Card */}
            <div className="group">
              <div className="card backdrop-blur-sm hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                   onClick={() => router.push("/calm")}
                   style={{
                     border: '1px solid var(--border)',
                     background: theme === 'dark' 
                       ? 'rgba(30, 41, 59, 0.8)'
                       : 'rgba(255, 255, 255, 0.8)'
                   }}>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                  }}>
                    <CalmIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Calm
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Find peace and relaxation. Practice mindfulness and stress relief techniques.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/warning")}
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                transform: 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <SparkleIcon className="w-5 h-5" />
              Get Started Now
            </button>
            <button
              onClick={() => router.push("/choose")}
              className="btn-secondary text-lg px-8 py-4"
              style={{
                border: '2px solid var(--accent-primary)',
                color: 'var(--accent-primary)'
              }}
            >
              Learn More
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              ✨ Trusted by thousands for mental wellness support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}