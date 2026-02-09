
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoldButton, GoldInput, GoldCard } from '../components/UI';
import { encryptMessage, hashPassword } from '../lib/crypto';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const CreatePage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!message || !password) {
      alert("Please enter both a message and a password.");
      return;
    }

    setIsLoading(true);
    try {
      const encrypted = await encryptMessage(message, password);
      const pHash = await hashPassword(password);
      
      const docRef = await addDoc(collection(db, "pages"), {
        message: encrypted,
        passwordHash: pHash,
        createdAt: serverTimestamp()
      });

      navigate('/share', { state: { messageId: docRef.id } });
    } catch (err) {
      console.error(err);
      alert("Failed to connect to Firebase. Ensure your project is active and rules are deployed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPreviewing) {
    return (
      <div className="animate-in fade-in zoom-in duration-700">
        <GoldCard className="relative overflow-hidden">
          <div className="absolute top-8 right-8 opacity-10">
             <svg className="w-20 h-20 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
          </div>
          
          <div className="text-center mb-10">
            <span className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.6em]">Previewing Your Message</span>
            <div className="w-16 h-[1px] bg-[#e5dcc3] mx-auto mt-4 mb-10" />
          </div>

          <div className="serif text-2xl md:text-3xl text-center leading-[1.8] text-[#3d2c00] italic whitespace-pre-wrap px-4 min-h-[100px]">
            {message || "Your message will appear here..."}
          </div>

          <div className="mt-16 pt-10 border-t border-[#f1e6c9] text-center">
            <p className="serif text-[#d4af37] text-xl mb-4 italic gold-glow">With Eternal Love</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <GoldButton variant="secondary" onClick={() => setIsPreviewing(false)}>
              Back to Edit
            </GoldButton>
            <GoldButton onClick={handleCreate} disabled={isLoading}>
              {isLoading ? 'Sealing...' : 'Seal with Gold'}
            </GoldButton>
          </div>
        </GoldCard>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <GoldCard>
        <h2 className="serif text-3xl text-center mb-8 gold-text">Create a Private Valentine</h2>
        <p className="text-[#8b6b00] text-center mb-10 text-xs font-light leading-relaxed tracking-wide opacity-80">
          Craft an intimate letter locked with a secret word only the two of you know.
        </p>

        <GoldInput 
          label="Your Intimate Greeting"
          placeholder="Write your heart out..."
          isTextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <GoldInput 
          label="Access Password"
          type="password"
          placeholder="A word only you two share"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <GoldButton variant="secondary" onClick={() => setIsPreviewing(true)}>
            Preview Letter
          </GoldButton>
          <GoldButton onClick={handleCreate} disabled={isLoading}>
            {isLoading ? 'Sealing...' : 'Seal with Gold'}
          </GoldButton>
        </div>
      </GoldCard>
    </div>
  );
};

export default CreatePage;
