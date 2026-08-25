import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from './ui';
import { useTheme } from '../lib/theme';

export default function Topbar({ onMenu, session }) {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const displayName = session?.user?.user_metadata?.display_name || session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || 'Hero';
  const initial = displayName.charAt(0).toUpperCase();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/courses?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between gap-3 border-b-3 border-ink bg-paper/95 px-4 backdrop-blur sm:px-6">
      
      {/* LEFT: Collapse Handle / Menu */}
      <div className="flex shrink-0 items-center">
        <button
          onClick={onMenu}
          className="rounded-lg border-3 border-ink bg-card p-2 shadow-nbsm lg:hidden hover:bg-yellow active:translate-x-[1px] active:translate-y-[1px] transition-all"
          aria-label="Open navigation"
        >
          <Icon name="Menu" className="h-5 w-5" />
        </button>
      </div>

      {/* CENTER: Search */}
      <div className="flex flex-1 items-center justify-center sm:justify-center">
        <form 
          onSubmit={handleSearch} 
          className={`relative flex w-full transition-all absolute top-2 left-2 right-14 sm:relative sm:top-0 sm:left-0 sm:right-0 sm:max-w-2xl ${
            searchOpen ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto'
          }`}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Icon name="Search" className="h-5 w-5 text-muted" />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH MULTIVERSE COURSES..."
            className="w-full rounded-full border-3 border-ink bg-card py-2.5 pl-11 pr-4 font-mono text-[11px] font-bold uppercase tracking-widest text-ink shadow-nbsm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
          />
          {searchOpen && (
            <button 
              type="button" 
              onClick={() => setSearchOpen(false)}
              className="absolute inset-y-0 right-2 flex items-center justify-center px-3 text-ink sm:hidden"
            >
              <Icon name="X" className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>

      {/* RIGHT: Controls */}
      <div className="flex shrink-0 items-center gap-2 relative z-40">
        {!searchOpen && (
          <button 
            onClick={() => setSearchOpen(true)}
            className="rounded-lg border-3 border-ink bg-card p-2 shadow-nbsm hover:bg-yellow active:translate-x-[1px] active:translate-y-[1px] transition-all sm:hidden" 
            aria-label="Open search"
          >
            <Icon name="Search" className="h-4 w-4" />
          </button>
        )}
        <button 
          onClick={toggle}
          className="grid h-9 w-9 place-items-center rounded-lg border-3 border-ink bg-card shadow-nbsm transition-all hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-nb active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbpress"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Icon name="Moon" className="h-4 w-4" /> : <Icon name="Sun" className="h-4 w-4" />}
        </button>
        <Link
          to="/profile"
          title={displayName}
          aria-label="Open profile"
          className="grid h-9 w-9 place-items-center rounded-lg border-3 border-ink bg-red font-display text-sm text-onaccent shadow-nbsm hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-nb active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbpress transition-all duration-100"
        >
          {initial}
        </Link>
      </div>
    </header>
  );
}
