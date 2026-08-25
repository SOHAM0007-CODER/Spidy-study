import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { navItems, user } from '../data/mock';
import { Icon } from './ui';
import SpiderMark from './SpiderMark';

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-ink/50 lg:hidden" onClick={onClose} aria-hidden />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r-3 border-ink bg-card transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'lg:-translate-x-full' : ''}`}
      >
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 grid h-7 w-7 place-items-center rounded-lg border-3 border-ink bg-card shadow-nbsm lg:grid z-50 hover:bg-yellow active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbpress transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} className="h-4 w-4" />
        </button>
        {/* Brand */}
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 border-b-3 border-ink px-5 py-5 text-ink group"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border-3 border-ink bg-gradient-to-br from-red to-violet shadow-nbsm group-hover:-rotate-6 transition-transform overflow-hidden">
            <img src="/image.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="font-display text-2xl uppercase leading-none tracking-tight">
              SPIDY<span className="text-red">STUDY</span>
            </div>
            <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[.2em] opacity-90 text-muted">
              Multiverse HQ
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg border-3 px-3 py-2.5 font-display text-sm uppercase tracking-wide transition-all duration-100 ${
                  isActive
                    ? 'border-ink bg-red text-onaccent shadow-nbsm'
                    : 'border-transparent text-ink hover:border-ink hover:bg-yellow hover:shadow-nbsm'
                }`
              }
            >
              <Icon name={item.icon} className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Streak */}
        <div className="mx-3 mb-4 rounded-xl border-3 border-ink bg-card p-4 shadow-nb">
          <div className="flex items-start justify-between mb-2">
            <span className="rounded-full border-3 border-ink bg-yellow px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-ink shadow-nbsm">
              Daily Streak
            </span>
            <Icon name="Flame" className="h-5 w-5 text-red" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display text-4xl leading-none">{user.streak}</span>
            <span className="font-display text-sm uppercase text-muted">Days Active</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-3 border-ink p-3 space-y-1.5">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg border-3 px-3 py-2.5 font-display text-sm uppercase tracking-wide transition-all duration-100 ${
                isActive 
                  ? 'border-ink bg-red text-onaccent shadow-nbsm' 
                  : 'border-transparent text-ink hover:border-ink hover:bg-paper hover:shadow-nbsm'
              }`
            }
          >
            <Icon name="Settings" className="h-5 w-5" /> SETTINGS
          </NavLink>
          <div className="p-4 border-t-3 border-ink">
            <button 
              onClick={() => {
                import('../lib/auth').then(async ({ signOut }) => {
                  await signOut();
                  window.location.href = '/login';
                });
              }}
              className="flex w-full items-center gap-3 rounded-lg border-3 border-transparent px-3 py-2.5 font-display text-sm uppercase tracking-wide text-red hover:border-ink hover:bg-red hover:text-onaccent hover:shadow-nbsm transition-all duration-100"
            >
              <Icon name="LogOut" className="h-5 w-5" /> LOGOUT
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
