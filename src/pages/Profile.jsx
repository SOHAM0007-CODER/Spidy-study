import React, { useMemo } from 'react';
import { user, badges, buildActivity } from '../data/mock';
import { Card, Btn, Tag, Icon, PageHead, SectionTitle, FILL } from '../components/ui';

const HEAT = ['bg-paper', 'bg-yellow', 'bg-pink', 'bg-red', 'bg-blue'];

function Heatmap() {
  const cells = useMemo(buildActivity, []);
  const active = cells.filter((c) => c > 0).length;
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow text-muted">Learning activity · one year of daily visits</span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
          {active} active days
        </span>
      </div>
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
  );
}

export default function Profile() {
  const unlocked = badges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-8">
      <PageHead
        eyebrow="Agent Dossier"
        title="Multiverse Agent Profile"
        sub="Manage your account, credentials and mission parameters."
        right={
          <Btn color="card" icon="Settings2">
            Edit settings
          </Btn>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Identity card */}
        <Card className="p-6 text-center">
          <div className="halftone mx-auto grid h-28 w-28 place-items-center border-3 border-ink bg-red text-white/25 shadow-nb">
            <span className="relative font-display text-5xl text-white">{user.initial}</span>
          </div>
          <h2 className="mt-4 font-display text-2xl uppercase leading-none">{user.name}</h2>
          <p className="mt-1.5 text-xs font-bold text-muted">{user.email}</p>
          <div className="mt-3 flex justify-center">
            <Tag color="lime">{user.status}</Tag>
          </div>
          <div className="mt-5 border-t-3 border-ink pt-5">
            <Btn color="red" icon="LogOut" className="w-full">
              Sign out of HQ
            </Btn>
          </div>
        </Card>

        {/* Stats + telemetry */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ['Rank', user.rank, 'blue', 'Shield'],
              ['Enrolled', user.enrolled, 'card', 'BookOpen'],
              ['Completed', user.completed, 'lime', 'CheckCircle2'],
              ['Streak', `${user.streak}d`, 'yellow', 'Flame'],
            ].map(([label, value, color, icon]) => (
              <Card key={label} color={color} className="p-4 text-center">
                <Icon name={icon} className="mx-auto h-4 w-4" />
                <div className="mt-2 font-display text-lg leading-none">{value}</div>
                <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest opacity-80">
                  {label}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-lg uppercase">Hero Telemetry Specification</h2>
              <Tag color="pink">Encrypted</Tag>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Hero codename', user.codename],
                ['Multiverse network', user.network],
              ].map(([k, v]) => (
                <div key={k} className="border-3 border-ink bg-paper p-3">
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">{k}</div>
                  <div className="mt-1 font-display text-sm uppercase">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t-3 border-ink pt-5">
              <Heatmap />
            </div>
          </Card>
        </div>
      </div>

      {/* Badges */}
      <div>
        <SectionTitle right={<Tag color="yellow">{unlocked} of {badges.length} unlocked</Tag>}>
          Multiverse Achievement Badges
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {badges.map((b) => (
            <Card
              key={b.id}
              hover={b.unlocked}
              className={`flex items-center gap-4 p-4 ${b.unlocked ? '' : 'opacity-55'}`}
            >
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center border-3 border-ink ${
                  b.unlocked ? FILL[b.color] : 'bg-paper'
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
