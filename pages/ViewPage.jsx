import React, { useState } from 'react';
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
      <div className="animate-in fade-in zoom-in duration-1000">
        <GoldCard className="relative overflow-hidden">
          <div className="absolute top-8 right-8 opacity-10">
             <svg className="w-20 h-20 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
          </div>
          
          <div className="text-center mb-10">
            <span className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.6em]">A Private Word</span>
            <div className="w-16 h-[1px] bg-[#e5dcc3] mx-auto mt-4 mb-10" />
          </div>

          <div className="serif text-2xl md:text-3xl text-center leading-[1.8] text-[#3d2c00] italic whitespace-pre-wrap px-4">
            {decryptedMessage}
          </div>

          <div className="mt-16 pt-10 border-t border-[#f1e6c9] text-center">
            <p className="serif text-[#d4af37] text-xl mb-4 italic gold-glow">With Eternal Love</p>
            <p className="text-[#b8a06e] text-[9px] font-bold uppercase tracking-[0.5em]">Unlocked Remembrance</p>
          </div>
        </GoldCard>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <GoldCard>
        <div className="text-center mb-10">
          <div className="inline-block mb-8">
            <div className="w-24 h-24 rounded-full border border-[#d4af37]/20 flex items-center justify-center bg-[#fdfbf7] shadow-lg">
              <svg className="w-10 h-10 text-[#d4af37] gold-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            {isUnlocking ? 'Opening...' : 'Reveal Letter'}
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