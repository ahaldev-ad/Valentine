
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoldButton, GoldInput, GoldCard } from '../components/UI.jsx';
import { decryptMessage, hashPassword } from '../lib/crypto.js';
import { db } from '../lib/firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const ViewPage = () => {
  const { messageId } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = async () => {
    if (!password) {
      setError("The vault requires a key.");
      return;
    }

    if (!messageId) {
      setError("Invalid access link.");
      return;
    }
    
    setIsUnlocking(true);
    setError(null);
    
    try {
      const docRef = doc(db, "pages", messageId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("This letter no longer exists in our vault.");
        return;
      }

      const data = docSnap.data();
      
      const enteredHash = await hashPassword(password);
      if (enteredHash !== data.passwordHash) {
        setError("The secret key provided is incorrect.");
        setIsUnlocking(false);
        return;
      }

      const message = await decryptMessage(data.message, password);
      
      if (message) {
        setDecryptedMessage(message);
      } else {
        setError("Decryption failed. Data might be corrupted.");
      }
    } catch (err) {
      console.error("Unlock error:", err);
      setError("Communication failed. Please check your connection.");
    } finally {
      setIsUnlocking(false);
    }
  };

  if (decryptedMessage) {
    return (
      <div className="animate-in fade-in zoom-in duration-1000 relative">
        {/* Subtle Romantic Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-float-heart opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-10%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#d4af37" />
              </svg>
            </div>
          ))}
        </div>

        <GoldCard className="relative overflow-hidden z-10 backdrop-blur-md bg-white/60">
          <div className="absolute top-8 right-8 opacity-5">
             <svg className="w-32 h-32 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
          </div>
          
          <div className="text-center mb-10 animate-fade-down">
            <span className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.8em] opacity-80">Unveiling The Eternal</span>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mx-auto mt-6" />
          </div>

          <div className="serif text-2xl md:text-3xl text-center leading-[2] text-[#3d2c00] italic px-4 relative">
             {/* Staggered word animation logic */}
             <div className="flex flex-wrap justify-center gap-x-2">
               {decryptedMessage.split(' ').map((word, idx) => (
                 <span 
                   key={idx} 
                   className="inline-block animate-word-reveal opacity-0"
                   style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}
                 >
                   {word}
                 </span>
               ))}
             </div>
          </div>

          <div className="mt-16 pt-10 border-t border-[#f1e6c9]/50 text-center animate-fade-up" style={{ animationDelay: '2s' }}>
            <p className="serif text-[#d4af37] text-2xl mb-4 italic gold-glow-strong">With Eternal Love</p>
            <p className="text-[#b8a06e] text-[8px] font-bold uppercase tracking-[0.6em] opacity-60">Locked in our hearts forever</p>
          </div>
        </GoldCard>

        <style>{`
          @keyframes float-heart {
            0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
            20% { opacity: 0.3; }
            80% { opacity: 0.1; }
            100% { transform: translateY(-120vh) scale(1.2) rotate(45deg); opacity: 0; }
          }
          
          @keyframes word-reveal {
            from { transform: translateY(10px); opacity: 0; filter: blur(5px); }
            to { transform: translateY(0); opacity: 1; filter: blur(0); }
          }

          @keyframes fade-down {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes fade-up {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .animate-word-reveal {
            animation: word-reveal 1s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          
          .animate-fade-down {
            animation: fade-down 1.5s forwards;
          }

          .animate-fade-up {
            animation: fade-up 1.5s forwards;
          }

          .gold-glow-strong {
            text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
            animation: soft-pulse 4s infinite ease-in-out;
          }

          @keyframes soft-pulse {
            0%, 100% { text-shadow: 0 0 10px rgba(212, 175, 55, 0.3); }
            50% { text-shadow: 0 0 25px rgba(212, 175, 55, 0.6); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <GoldCard>
        <div className="text-center mb-10">
          <div className="inline-block mb-8">
            <div className="w-24 h-24 rounded-full border border-[#d4af37]/20 flex items-center justify-center bg-[#fdfbf7] shadow-lg relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <svg className="w-10 h-10 text-[#d4af37] gold-glow relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2z" />
              </svg>
            </div>
          </div>
          <h2 className="serif text-3xl mb-4 gold-text">Access the Vault</h2>
          <p className="text-[#8b6b00] text-xs font-light leading-relaxed tracking-wide px-4 opacity-70">
            The sentiments within this letter are protected. Provide the secret key to reveal them.
          </p>
        </div>

        <GoldInput 
          label="The Private Key"
          type="password"
          placeholder="Enter shared secret..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
        />

        {error && (
          <p className="text-red-700 text-[10px] font-bold text-center mb-6 animate-shake uppercase tracking-[0.2em] bg-red-50 py-3 rounded-lg border border-red-100">
            {error}
          </p>
        )}

        <div className="flex justify-center mt-6">
          <GoldButton onClick={handleUnlock} disabled={isUnlocking} className="w-full">
            {isUnlocking ? 'Unsealing...' : 'Reveal Letter'}
          </GoldButton>
        </div>

        <div className="mt-10 pt-8 border-t border-[#f1e6c9] text-center">
           <button 
             onClick={() => navigate('/')}
             className="text-[#b8a06e] hover:text-[#d4af37] text-[8px] font-bold uppercase tracking-[0.4em] transition-colors"
           >
             Go to Home
           </button>
        </div>
      </GoldCard>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ViewPage;
