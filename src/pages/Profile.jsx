import React, { useMemo } from 'react';
import { user, badges, buildActivity } from '../data/mock';
import { Card, Btn, Tag, Icon, PageHead, SectionTitle, FILL } from '../components/ui';
import SpiderMark from '../components/SpiderMark';

const HEAT = ['bg-paper', 'bg-yellow', 'bg-pink', 'bg-red', 'bg-blue'];

function Heatmap() {
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
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <div className="flex-1 min-w-0">
        <div className="eyebrow text-muted">Learning activity · one year of daily visits</div>
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
      
      <div className="flex gap-4 md:flex-col shrink-0 justify-around md:justify-start">
        {[
          ['Active days', activeDays],
          ['Active weeks', activeWeeks],
          ['Longest streak', longestStreak]
        ].map(([k, v]) => (
          <div key={k}>
            <div className="font-display text-2xl leading-none">{v}</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted mt-0.5">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Profile() {
  const unlocked = badges.filter((b) => b.unlocked).length;
  const locked = badges.length - unlocked;

  return (
    <div className="space-y-8">
      {/* BLOCK A — page header */}
      <PageHead
        eyebrow="Agent Dossier"
        title="Multiverse Agent Profile"
        sub="Manage your account, parameters and mission credentials."
        right={
          <Btn color="card" icon="Settings2">
            Edit settings
          </Btn>
        }
      />

      {/* BLOCK B — identity card (left) + stat row (right) */}
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="p-6 text-center">
          <div className="relative mx-auto grid h-28 w-28 place-items-center border-3 border-ink bg-red shadow-nb overflow-hidden">
            <SpiderMark className="absolute inset-0 m-auto h-24 w-24 text-ink opacity-15" />
            <span className="relative font-display text-5xl text-onaccent">{user.initial}</span>
          </div>
          <h2 className="mt-4 font-display text-2xl uppercase leading-none">{user.name}</h2>
          <p className="mt-1.5 text-xs font-bold text-muted">{user.email}</p>
          <div className="mt-3 flex justify-center">
            <Tag color="card">{user.status || 'Active Multiverse User'}</Tag>
          </div>
          <div className="mt-5 border-t-3 border-ink pt-5">
            <Btn color="red" icon="LogOut" className="w-full">
              Sign out of HQ
            </Btn>
          </div>
        </Card>

        <div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 h-full">
            {[
              ['Rank', user.rank, 'blue', 'Shield'],
              ['Courses', user.enrolled, 'card', 'BookOpen'],
              ['Completed', user.completed, 'lime', 'CheckCircle2'],
              ['Daily Streak', `${user.streak}d`, 'yellow', 'Flame'],
              ['Trophies', user.trophies || 3, 'pink', 'Trophy'],
            ].map(([label, value, color, icon]) => (
              <Card key={label} color={color} className="p-4 text-center flex flex-col justify-center items-center">
                <Icon name={icon} className="h-5 w-5 mb-2" />
                <div className="font-display text-2xl leading-none">{value}</div>
                <div className="mt-1.5 font-mono text-[9px] font-bold uppercase tracking-widest opacity-80">
                  {label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* BLOCK C — Hero Telemetry Specification panel */}
      <Card className="p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl uppercase">Hero Telemetry Specification</h2>
          <Tag color="card">Encrypted</Tag>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['Hero codename', user.codename],
            ['Multiverse network', user.network],
          ].map(([k, v]) => (
            <div key={k} className="border-3 border-ink bg-paper p-3">
              <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">{k}</div>
              <div className="mt-1 font-display text-lg uppercase">{v}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-t-3 border-ink pt-6">
          <Heatmap />
        </div>
      </Card>

      {/* BLOCK D — Achievement badges */}
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
