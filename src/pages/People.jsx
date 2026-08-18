import React, { useState } from 'react';
import { people } from '../data/mock';
import { Card, Btn, Tag, Search, Icon, PageHead, SectionTitle, FILL } from '../components/ui';

export default function People() {
  const [query, setQuery] = useState('');
  const list = people.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="space-y-8">
      <PageHead
        eyebrow="Spider Society"
        title="People"
        sub="Other agents running their own timelines. Compare streaks, not self-worth."
      />

      <Search value={query} onChange={setQuery} placeholder="Search agents…" />

      <SectionTitle right={<Tag color="yellow">Ranked by missions</Tag>}>Active agents</SectionTitle>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[...list].sort((a, b) => b.missions - a.missions).map((p, i) => (
          <Card key={p.id} hover className="p-5">
            <div className="flex items-center gap-3">
              <span className={`grid h-12 w-12 place-items-center border-3 border-ink ${FILL[p.color]} font-display text-lg`}>
                {p.name[0]}
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-display text-sm uppercase">{p.name}</h3>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{p.rank}</div>
              </div>
              <span className="ml-auto border-3 border-ink bg-paper px-2 py-1 font-mono text-[10px] font-bold">
                #{i + 1}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="border-3 border-ink bg-paper p-2.5 text-center">
                <div className="font-display text-lg leading-none">{p.streak}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted">Day streak</div>
              </div>
              <div className="border-3 border-ink bg-paper p-2.5 text-center">
                <div className="font-display text-lg leading-none">{p.missions}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted">Missions</div>
              </div>
            </div>
            <Btn color="card" icon="UserPlus" className="mt-4 w-full">
              Follow
            </Btn>
          </Card>
        ))}
      </div>
    </div>
  );
}
