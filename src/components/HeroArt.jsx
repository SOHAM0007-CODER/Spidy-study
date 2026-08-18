import React, { useState } from 'react';

// The asset lives at /public/hero-spiderman.png, ideally a transparent PNG around 800px tall.
export default function HeroArt({ className = '', style = {} }) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <img 
      src="/hero-spiderman.png" 
      alt="" 
      aria-hidden="true"
      onError={() => setError(true)}
      className={className}
      style={style}
    />
  );
}
