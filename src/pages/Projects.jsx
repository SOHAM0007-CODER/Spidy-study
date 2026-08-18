import React, { useState } from 'react';
import { projects } from '../data/mock';
import { Card, Btn, Tag, Chip, Icon, PageHead, SectionTitle, FILL } from '../components/ui';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Projects() {
  const [level, setLevel] = useState('All');
  const list = projects.filter((p) => level === 'All' || p.level === level);

  return (
    <div className="space-y-8">
      <PageHead
        eyebrow="Multiverse Labs"
        badge="Adaptive Portfolio Missions"
        title="Projects"
        sub="Build something a recruiter can open. Every lab ships with a system flow and a defined stack."
        right={
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                {l}
              </Chip>
            ))}
          </div>
        }
      />

      <SectionTitle right={<span className="eyebrow text-muted">{list.length} labs</span>}>
        Generate a resume-friendly project
      </SectionTitle>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <Card key={p.id} hover className="flex flex-col">
            <div className={`${FILL[p.color]} halftone flex items-center justify-between border-b-3 border-ink p-4 text-ink/20`}>
              <span className="relative border-3 border-ink bg-card p-2 text-ink shadow-nbsm">
                <Icon name="Code2" className="h-5 w-5" />
              </span>
              <Tag color="card">{p.level}</Tag>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg uppercase leading-tight">{p.title}</h3>
              <p className="mt-2 text-sm font-medium text-muted">{p.blurb}</p>

              <div className="mt-4">
                <div className="eyebrow mb-2 text-muted">System flow</div>
                <div className="space-y-1.5">
                  {p.flow.map((f, i) => (
                    <div key={f} className="flex items-center gap-2 border-3 border-ink bg-paper px-2.5 py-1.5">
                      <span className="grid h-5 w-5 place-items-center border-2 border-ink bg-yellow font-mono text-[9px] font-bold">
                        {i + 1}
                      </span>
                      <span className="text-xs font-bold">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="eyebrow mb-2 text-muted">Tech stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="border-3 border-ink bg-card px-2 py-1 font-mono text-[10px] font-bold uppercase">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Btn color={p.color} icon="Rocket" className="mt-5 w-full">
                Start mission
              </Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
