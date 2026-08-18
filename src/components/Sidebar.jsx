import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navItems, user } from '../data/mock';
import { Icon, FILL } from './ui';

function SpiderMark({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M16 3v26M3 16h26M6 6l20 20M26 6L6 26" />
      <circle cx="16" cy="16" r="4.5" fill="currentColor" stroke="none" />
      <path d="M16 8.5 22 16l-6 7.5L10 16z" />
    </svg>
  );
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-ink/50 lg:hidden" onClick={onClose} aria-hidden />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r-3 border-ink bg-card transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 border-b-3 border-ink bg-red px-5 py-5 text-white"
        >
          <SpiderMark className="h-7 w-7" />
          <div>
            <div className="font-display text-lg uppercase leading-none tracking-tight">
              ADAPT<span className="text-yellow">Learn</span>
            </div>
            <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[.2em] opacity-90">
              Multiverse HQ
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `mb-1.5 flex items-center gap-3 border-3 px-3 py-2.5 font-semibold transition-all duration-100 ${
                  isActive
                    ? 'translate-x-[2px] translate-y-[2px] border-ink bg-ink text-paper shadow-nbpress'
                    : 'border-transparent text-ink hover:border-ink hover:bg-paper hover:shadow-nbsm'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`border-3 border-ink p-1 ${FILL[item.color]} ${
                      isActive ? '' : 'shadow-none'
                    }`}
                  >
                    <Icon name={item.icon} className="h-3.5 w-3.5 text-ink" />
                  </span>
                  <span className="text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Streak */}
        <div className="mx-3 mb-3 border-3 border-ink bg-yellow p-3.5 shadow-nb">
          <div className="flex items-center gap-2">
            <Icon name="Flame" className="h-5 w-5" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[.16em]">
              Day Streak
            </span>
          </div>
          <div className="mt-1.5 font-display text-2xl leading-none">{user.streak} DAYS</div>
          <div className="mt-2.5 flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 flex-1 border-2 border-ink ${i < user.streak ? 'bg-red' : 'bg-card'}`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-3 border-ink p-3">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `mb-1.5 flex items-center gap-3 border-3 px-3 py-2 text-sm font-semibold ${
                isActive ? 'border-ink bg-ink text-paper' : 'border-transparent hover:border-ink hover:bg-paper'
              }`
            }
          >
            <Icon name="Settings" className="h-4 w-4" /> Settings
          </NavLink>
          <button className="flex w-full items-center gap-3 border-3 border-transparent px-3 py-2 text-sm font-semibold text-red hover:border-ink hover:bg-red hover:text-white">
            <Icon name="LogOut" className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>
    </>
  );
}
