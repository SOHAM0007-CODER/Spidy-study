import React, { useState } from 'react';
import { projects } from '../data/mock';
import { Card, Btn, Tag, Icon, PageHead, SectionTitle } from '../components/ui';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Projects() {
  const [level, setLevel] = useState('All');
  
  const cycleLevel = () => {
    const currentIndex = LEVELS.indexOf(level);
    const nextIndex = (currentIndex + 1) % LEVELS.length;
    setLevel(LEVELS[nextIndex]);
  };

  const list = projects.filter((p) => level === 'All' || p.level === level);

  const displayLevel = level === 'All' ? 'ADAPTIVE' : level.toUpperCase();

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHead
        boxed={true}
        eyebrow="Multiverse Labs"
        icon="FolderKanban"
        title="Adaptive Portfolio Missions"
        sub={`Generating ${displayLevel} projects based on your learning patterns.`}
        right={
          <button 
            onClick={cycleLevel}
            className="flex items-center gap-3 rounded-lg border-3 border-ink bg-yellow px-4 py-3 shadow-nb hover:bg-red hover:text-onaccent transition-colors group text-ink"
          >
            <Icon name="Target" className="h-6 w-6" />
            <span className="font-display text-xl uppercase leading-none">{displayLevel} LEVEL</span>
          </button>
        }
      />

      <SectionTitle right={`${list.length} LABS`}>
        Generate a resume-friendly project
      </SectionTitle>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <Card key={p.id} hover className="flex flex-col p-5">
            <div className="flex items-start justify-between mb-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border-3 border-ink bg-red text-onaccent shadow-nbsm">
                <Icon name="Network" className="h-6 w-6" />
              </span>
              <Tag color="yellow">{p.level}</Tag>
            </div>

            <div className="flex flex-1 flex-col">
              <h3 className="font-display text-xl uppercase leading-tight mb-3">{p.title}</h3>
              
              <div className="mb-5">
                <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-widest text-violet">
                  Use Case
                </div>
                <p className="text-sm font-bold text-ink leading-snug">{p.blurb}</p>
              </div>

              <div className="mb-5 rounded-lg border-3 border-ink bg-paper p-4">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan">
                  <Icon name="GitBranch" className="h-3.5 w-3.5" />
                  System Flow
                </div>
                <div className="text-xs font-bold leading-relaxed text-ink">
                  {p.flow.join(' → ')}
                </div>
              </div>

              <div className="mb-6 flex-1">
                <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Tech stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-lg border-3 border-ink bg-paper px-2 py-1 font-mono text-[10px] font-bold uppercase text-ink shadow-nbsm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Btn color="red" icon="Sparkles" className="w-full">
                Start mission
              </Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
