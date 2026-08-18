import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Btn, Tag, Search, Icon, PageHead, SectionTitle, Empty, Progress } from '../components/ui';

const DECKS = [
  { id: 'd1', title: 'Backpropagation', due: 8, mastery: 72, color: 'red' },
  { id: 'd2', title: 'Attention Mechanism', due: 5, mastery: 54, color: 'blue' },
  { id: 'd3', title: 'React Reconciliation', due: 0, mastery: 91, color: 'pink' },
];

export default function Revision() {
  const [query, setQuery] = useState('');
  const [emptyMode, setEmptyMode] = useState(false);
  const decks = DECKS.filter((d) => d.title.toLowerCase().includes(query.trim().toLowerCase()));
  const dueTotal = DECKS.reduce((a, d) => a + d.due, 0);

  return (
    <div className="space-y-8">
      <PageHead
        eyebrow="Spaced Repetition Engine"
        badge="All time"
        title="Revision"
        sub="Cards resurface exactly when you are about to forget them. That is the whole trick."
        right={
          <Btn color="card" icon={emptyMode ? 'Eye' : 'EyeOff'} onClick={() => setEmptyMode((v) => !v)}>
            {emptyMode ? 'Show decks' : 'Preview empty state'}
          </Btn>
        }
      />

      <Search value={query} onChange={setQuery} placeholder="Search multiverse topics…" />

      {/* Engine banner */}
      <Card color="pink" className="grid gap-0 md:grid-cols-[1fr_auto]">
        <div className="p-6">
          <Tag color="card">Multiverse Repetition Engine</Tag>
          <h2 className="mt-3 font-display text-2xl uppercase leading-none">
            {dueTotal} cards due across your timelines
          </h2>
          <p className="mt-2 max-w-xl text-sm font-bold text-ink/75">
            Intervals stretch as you get things right and collapse the moment you slip. Run the queue
            daily and retention holds around 90%.
          </p>
          <Btn color="card" icon="Zap" className="mt-5">
            Start revision run
          </Btn>
        </div>
        <div className="halftone flex items-center justify-center border-t-3 border-ink bg-yellow p-6 text-ink/25 md:border-l-3 md:border-t-0">
          <div className="relative text-center">
            <div className="font-display text-5xl leading-none text-ink">90%</div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-ink">
              Retention target
            </div>
          </div>
        </div>
      </Card>

      {/* Decks */}
      <div>
        <SectionTitle>Completed Missions & Study Decks</SectionTitle>
        {emptyMode || decks.length === 0 ? (
          <Empty
            icon="Layers"
            title="Your multiverse revision queue is empty"
            body="Decks appear once you finish a video mission or attempt a quiz. Complete one and the cards build themselves."
            action={
              <Link to="/courses">
                <Btn color="yellow" icon="Compass">
                  Find a mission
                </Btn>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {decks.map((d) => (
              <Card key={d.id} hover className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-base uppercase leading-tight">{d.title}</h3>
                  <Tag color={d.due > 0 ? 'red' : 'lime'}>{d.due > 0 ? `${d.due} due` : 'Clear'}</Tag>
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between font-mono text-[10px] font-bold uppercase">
                    <span>Mastery</span>
                    <span>{d.mastery}%</span>
                  </div>
                  <Progress value={d.mastery} color={d.color} />
                </div>
                <Btn color={d.due > 0 ? d.color : 'card'} className="mt-4 w-full" icon="RotateCcw">
                  {d.due > 0 ? 'Review now' : 'Practice anyway'}
                </Btn>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
