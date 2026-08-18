import React from 'react';
import { Link } from 'react-router-dom';
import { user } from '../data/mock';
import { Icon } from './ui';

export default function Topbar({ onMenu }) {
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
        <button className="border-3 border-ink bg-card p-2 shadow-nbsm hover:bg-yellow" aria-label="Notifications">
          <Icon name="Bell" className="h-4 w-4" />
        </button>
        <Link
          to="/profile"
          className="flex items-center gap-2.5 border-3 border-ink bg-card py-1.5 pl-1.5 pr-3 shadow-nbsm hover:bg-yellow"
        >
          <span className="grid h-8 w-8 place-items-center border-3 border-ink bg-red font-display text-sm text-white">
            {user.initial}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-xs font-bold leading-none">{user.name}</span>
            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-widest text-muted">
              {user.rank}
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}
