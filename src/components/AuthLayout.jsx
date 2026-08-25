import React, { useState } from 'react';
import { Tag } from './ui';

export default function AuthLayout({ children }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="dark flex h-screen w-screen overflow-hidden bg-gradient-to-br from-red to-violet text-ink">
      
      {/* LEFT PANEL: Art & Video */}
      <div className="relative hidden md:block w-[55%] shrink-0 overflow-hidden">
        
        {/* Video or Fallback */}
        {!videoError ? (
          <video 
            src="/spidy.mp4"
            autoPlay 
            loop 
            muted 
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img 
            src="/spidey-jump.png" 
            alt="Spider-Man" 
            className="absolute inset-0 h-full w-full object-contain p-10" 
          />
        )}
        
        {/* Vignette to blend into the right panel */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-paper to-transparent z-10" />

        {/* Wordmark Overlay */}
        <div className="absolute top-8 left-8 flex items-center gap-3 z-20">
          <div className="grid h-10 w-10 place-items-center rounded-lg border-3 border-ink bg-gradient-to-br from-red to-violet shadow-nbsm shrink-0 overflow-hidden">
            <img src="/image.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div className="font-display text-2xl uppercase leading-none tracking-tight">
            <span className="text-white">SPIDY</span><span className="text-red">STUDY</span>
          </div>
        </div>

        {/* Top-Right Tag */}
        <div className="absolute top-8 right-16 z-20">
          <Tag color="yellow" className="rotate-3 shadow-nb uppercase border-3">
            * PORTAL GATEWAY EARTH-1610 *
          </Tag>
        </div>

        {/* Bottom-Left Text */}
        <div className="absolute bottom-10 left-8 z-20 max-w-sm">
          <p className="font-mono text-sm uppercase tracking-widest text-white/70">
            Unleash your adaptive learning superpower
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: Form Container */}
      <div className="relative flex flex-1 items-center justify-center p-4 sm:p-6 md:bg-paper z-10 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}
