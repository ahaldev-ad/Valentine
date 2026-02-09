
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const GoldButton: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-10 py-4 rounded-full font-semibold tracking-widest uppercase transition-all duration-500 transform active:scale-95 text-[11px]";
  const variants = {
    primary: "bg-gradient-to-r from-[#d4af37] via-[#f9e498] to-[#b8860b] text-[#3d2c00] hover:brightness-105 shadow-[0_10px_30px_rgba(212,175,55,0.2)] border border-[#f9e498]",
    secondary: "bg-transparent border border-[#d4af37]/50 text-[#b8860b] hover:bg-[#d4af37]/5"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} {...props}>
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  isTextArea?: boolean;
}

export const GoldInput: React.FC<InputProps> = ({ label, isTextArea = false, className = '', ...props }) => {
  const inputClasses = "w-full bg-[#fffefc] border border-[#e5dcc3] p-4 text-[#3d2c00] rounded-2xl focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 transition-all duration-500 placeholder:text-[#b8a06e]/50 font-light text-sm shadow-sm";
  
  return (
    <div className="mb-6 w-full">
      {label && <label className="block text-[#8b6b00] text-[9px] font-bold uppercase tracking-[0.3em] mb-3 ml-4">{label}</label>}
      {isTextArea ? (
        <textarea className={`${inputClasses} min-h-[140px] resize-none`} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input className={inputClasses} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </div>
  );
};

export const GoldCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-2xl border border-[#f1e6c9] p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(212,175,55,0.1)] relative overflow-hidden ${className}`}>
      {/* Subtle gold accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      {children}
    </div>
  );
};
