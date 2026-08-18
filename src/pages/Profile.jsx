import React, { useMemo } from 'react';
import { user, badges, buildActivity } from '../data/mock';
import { Card, Btn, Tag, Icon, PageHead, SectionTitle, FILL } from '../components/ui';
import HeroArt from '../components/HeroArt';

const HEAT = ['bg-paper', 'bg-yellow', 'bg-pink', 'bg-red', 'bg-blue'];

function Heatmap({ cells }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <div className="flex-1 min-w-0">
        <div className="mt-3 overflow-x-auto pb-2">
          <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
            {cells.map((v, i) => (
              <span
                key={i}
                title={`Level ${v}`}
                className={`h-[11px] w-[11px] border border-ink ${HEAT[v]}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">Less</span>
          {HEAT.map((c, i) => (
            <span key={i} className={`h-[11px] w-[11px] border border-ink ${c}`} />
          ))}
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">More</span>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const unlocked = badges.filter((b) => b.unlocked).length;
  const locked = badges.length - unlocked;

  const cells = useMemo(buildActivity, []);
  const activeDays = cells.filter((c) => c > 0).length;
  
  let activeWeeks = 0;
  for (let i = 0; i < cells.length; i += 7) {
    const week = cells.slice(i, i + 7);
    if (week.some((c) => c > 0)) activeWeeks++;
  }
  
  let longestStreak = 0;
  let currentStreak = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] > 0) {
      currentStreak++;
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <PageHead
        boxed={true}
        eyebrow="Hero Dossier • Secure Archive"
        icon="Shield"
        title="Multiverse Agent Profile"
        sub="Manage account parameters, active dimension credentials, and adaptive telemetry"
        right={
          <div className="rounded-lg border-3 border-ink bg-yellow px-3 py-1.5 font-display uppercase text-ink shadow-nbsm inline-block rotate-2">
            * Earth-1610 HQ *
          </div>
        }
      />

      {/* ROW */}
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        
        {/* IDENTITY CARD */}
        <Card className="flex flex-col items-center p-6 text-center">
          <div className="relative mt-2 mb-6">
            <Tag color="yellow" className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 -rotate-2">
              Clearance V
            </Tag>
            <div className="relative flex h-28 w-28 items-center justify-center">
              {/* Chromatic border effect */}
              <div className="absolute inset-0 bg-cyan translate-x-[4px] translate-y-[4px] rounded-xl border-3 border-ink" />
              <div className="absolute inset-0 bg-pink -translate-x-[4px] -translate-y-[4px] rounded-xl border-3 border-ink" />
              {/* Main tile */}
              <div className="relative z-10 flex h-full w-full items-center justify-center rounded-xl border-3 border-ink bg-ink text-onaccent font-display text-5xl">
                {user.initial}
              </div>
            </div>
          </div>
          
          <h2 className="font-display text-3xl uppercase leading-none">{user.name}</h2>
          <p className="mt-1.5 text-sm font-bold text-muted">{user.email}</p>
          
          <div className="relative mt-6 mb-6 h-32 w-full overflow-hidden rounded-lg border-3 border-ink bg-cyan">
            <div className="absolute inset-0 bg-gradient-to-r from-red to-pink" />
            <div className="absolute inset-0 halftone text-onaccent/20" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90 mix-blend-screen overflow-hidden">
              <HeroArt className="h-[120%] w-[120%] object-contain opacity-50" />
            </div>
          </div>
          
          <div className="mt-auto w-full pt-4">
            <Btn 
              color="red" 
              className="w-full"
              onClick={() => {
                import('../lib/auth').then(({ signOut }) => {
                  signOut();
                  window.location.href = '/login';
                });
              }}
            >
              Sign out of HQ
            </Btn>
          </div>
        </Card>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* STAT TILES */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ['Courses Enrolled', user.enrolled, 'cyan', 'BookOpen'],
              ['Completed', user.completed, 'red', 'CheckCircle2'],
              ['Daily Streak', `${user.streak}d`, 'yellow', 'Flame'],
              ['Badges Earned', user.trophies || 4, 'pink', 'Trophy'],
            ].map(([label, value, color, icon]) => (
              <Card key={label} className="p-5 flex flex-col justify-between">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-3 border-ink text-ink shadow-nbsm ${FILL[color]}`}>
                  <Icon name={icon} className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-3xl leading-none">{value}</div>
                <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-muted">
                  {label}
                </div>
              </Card>
            ))}
          </div>

          {/* HERO TELEMETRY SPECIFICATIONS */}
          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-cyan pb-2">
              <h2 className="font-display text-xl uppercase text-cyan">Hero Telemetry Specifications</h2>
              <Tag color="yellow" className="-rotate-1">Encrypted</Tag>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 mb-8">
              {[
                ['Hero codename', user.codename, 'User'],
                ['Multiverse network email', user.email, 'Mail'],
              ].map(([k, v, ic]) => (
                <div key={k}>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted mb-2">{k}</div>
                  <div className="flex items-center gap-2">
                    <Icon name={ic} className="h-4 w-4 text-ink opacity-70" />
                    <span className="font-bold text-ink">{v}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* INSET BOX FOR LEARNING ACTIVITY */}
            <div className="rounded-lg border-3 border-ink bg-paper p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 font-bold text-ink text-base">
                    <Icon name="Calendar" className="h-4 w-4" />
                    Learning Activity
                  </div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted mt-1">
                    One year of daily visits
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg border-3 border-ink bg-card px-2 py-1 shadow-nbsm">
                    <Icon name="Calendar" className="h-3 w-3 text-cyan" />
                    <span className="font-mono text-[10px] font-bold uppercase">{activeDays} Active Days</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border-3 border-ink bg-card px-2 py-1 shadow-nbsm">
                    <Icon name="TrendingUp" className="h-3 w-3 text-red" />
                    <span className="font-mono text-[10px] font-bold uppercase">{activeWeeks} This Week</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border-3 border-ink bg-card px-2 py-1 shadow-nbsm">
                    <Icon name="Flame" className="h-3 w-3 text-yellow" />
                    <span className="font-mono text-[10px] font-bold uppercase">{longestStreak}d Best Streak</span>
                  </div>
                </div>
              </div>
              
              <Heatmap cells={cells} />
            </div>
          </Card>
        </div>
      </div>

      {/* ACHIEVEMENT BADGES */}
      <div>
        <SectionTitle right={<Tag color="card">{unlocked} unlocked · {locked} locked</Tag>}>
          Multiverse Achievement Badges
        </SectionTitle>
        
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b) => (
            <Card
              key={b.id}
              color="card"
              hover={b.unlocked}
              className={`flex items-center gap-4 p-4 ${!b.unlocked ? 'opacity-55' : ''}`}
            >
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center border-3 border-ink ${
                  b.unlocked ? FILL[b.color] : 'bg-paper text-ink'
                }`}
              >
                <Icon name={b.unlocked ? b.icon : 'Lock'} className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-sm uppercase leading-tight">{b.name}</h3>
                <p className="mt-1 text-xs font-semibold text-muted">{b.note}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
