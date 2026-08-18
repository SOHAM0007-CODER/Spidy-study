import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navItems, user } from '../data/mock';
import { Icon, FILL } from './ui';
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
          className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 grid h-7 w-7 place-items-center border-3 border-ink bg-card shadow-nbsm lg:grid z-50 hover:bg-yellow active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbpress transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} className="h-4 w-4" />
        </button>
        {/* Brand */}
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 border-b-3 border-ink bg-red px-5 py-5 text-onaccent"
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
          <button className="flex w-full items-center gap-3 border-3 border-transparent px-3 py-2 text-sm font-semibold text-red hover:border-ink hover:bg-red hover:text-onaccent">
            <Icon name="LogOut" className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>
    </>
  );
}
