import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoldButton, GoldCard } from '../components/UI.jsx';

const SharePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const messageId = location.state?.messageId;

  useEffect(() => {
    if (!messageId) {
      navigate('/');
    }
  }, [messageId, navigate]);

  const origin = window.location.origin;
  const path = window.location.pathname;
  const shareUrl = `${origin}${path}#/view/${messageId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <GoldCard>
        <div className="text-center mb-8">
          <div className="inline-block p-5 rounded-full bg-[#fdfbf7] border border-[#d4af37]/20 mb-6 shadow-md">
            <svg className="w-8 h-8 text-[#d4af37] gold-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="serif text-3xl mb-4 gold-text">Letter Sealed</h2>
          <p className="text-[#8b6b00] text-xs font-light mb-8 italic tracking-wider opacity-70">
            "Your message is held in the digital vault."
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-[#8b6b00] text-[9px] font-bold uppercase tracking-[0.2em] mb-3 ml-4">Access Link</label>
          <div className="bg-[#fdfbf7] border border-[#e5dcc3] p-5 text-[#8b6b00] rounded-2xl font-mono text-[10px] break-all shadow-inner">
            {shareUrl}
          </div>
        </div>

        <div className="space-y-4">
          <GoldButton className="w-full" onClick={copyToClipboard}>
            {copied ? 'Link Saved' : 'Copy Private Link'}
          </GoldButton>
          
          <div className="bg-[#fdfbf7] border border-[#e5dcc3] p-6 rounded-2xl">
             <p className="text-[#8b6b00] text-[10px] leading-relaxed text-center font-medium tracking-wide">
               <span className="block mb-2 uppercase tracking-[0.3em] text-[#d4af37] font-bold">Privacy Protocol</span>
               Share this link and your chosen password separately. The vault requires both to reveal your heart.<br>End-To-End Encrypted
             </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#f1e6c9] text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-[#b8a06e] hover:text-[#d4af37] text-[9px] font-bold uppercase tracking-[0.4em] transition-all duration-500"
          >
            Forge Another Letter
          </button>
        </div>
      </GoldCard>
    </div>
  );
};

export default SharePage;