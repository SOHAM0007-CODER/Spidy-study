import React from 'react';
import { Link } from 'react-router-dom';
import { user } from '../data/mock';
import { Icon } from './ui';
import { useTheme } from '../lib/theme';

export default function Topbar({ onMenu }) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b-3 border-ink bg-paper/95 px-4 py-3 backdrop-blur sm:px-6">
      <button
        onClick={onMenu}
        className="border-3 border-ink bg-card p-2 shadow-nbsm lg:hidden"
        aria-label="Open navigation"
      >
        <Icon name="Menu" className="h-5 w-5" />
      </button>

      <div className="hidden items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-muted lg:flex">
        <span className="h-2 w-2 animate-pulse bg-lime border-2 border-ink" />
        Telemetry link stable
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button 
          onClick={toggle}
          className="border-3 border-ink bg-card p-2 shadow-nbsm hover:bg-yellow transition-transform active:scale-95" 
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Icon name="Moon" className="h-4 w-4" /> : <Icon name="Sun" className="h-4 w-4" />}
        </button>
        <Link
          to="/profile"
          title={user.name}
          aria-label="Open profile"
          className="grid h-9 w-9 place-items-center border-3 border-ink bg-red font-display text-sm text-onaccent shadow-nbsm hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-nb active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbpress transition-all duration-100"
        >
          {user.initial}
        </Link>
      </div>
    </header>
  );
}
