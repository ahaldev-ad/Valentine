
import React from 'react';

const GoldLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-[#fdfbf7]">
      {/* Moving Golden Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="gradient-bg w-full h-full opacity-40" />
        <div className="noise-overlay absolute inset-0 mix-blend-overlay opacity-10" />
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#f9e498] to-transparent blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#d4af37] to-transparent blur-[150px]" />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-2xl animate-in fade-in duration-1000">
        <header className="text-center mb-10">
          <h1 className="serif text-4xl md:text-5xl font-bold mb-2 gold-text tracking-widest uppercase">
            L'Or Éternel
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="text-[#8b6b00] font-light text-[10px] uppercase tracking-[0.5em]">
            Private • Elegant • Forever
          </p>
        </header>
        
        {children}

        <footer className="mt-12 text-center text-[#b8a06e] text-[9px] font-medium tracking-[0.5em] uppercase flex flex-col items-center gap-2">
          <span>To love, To be loved, Spread love</span>
          <span className="opacity-60 text-[8px] tracking-[0.3em]">Created by SASU & AD</span>
        </footer>
      </main>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
         {[...Array(20)].map((_, i) => (
           <div 
             key={i}
             className="absolute w-1 h-1 bg-[#d4af37] rounded-full"
             style={{
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               animation: `pulse ${4 + Math.random() * 6}s infinite ease-in-out ${Math.random() * 5}s`
             }}
           />
         ))}
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        
        @keyframes moveBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .gradient-bg {
          background: linear-gradient(-45deg, #fdfbf7, #f7f3e8, #fffefc, #f1e6c9);
          background-size: 400% 400%;
          animation: moveBg 15s ease infinite;
        }

        .noise-overlay {
          background: transparent;
          filter: url(#noiseFilter);
        }
      `}</style>
    </div>
  );
};

export default GoldLayout;
