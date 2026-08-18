import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Btn, Tag, Icon, PageHead, SectionTitle, Progress, FILL } from '../components/ui';

const DECKS = [
  { id: 'd1', title: 'Backpropagation', due: 8, mastery: 72, color: 'red' },
  { id: 'd2', title: 'Attention Mechanism', due: 5, mastery: 54, color: 'blue' },
  { id: 'd3', title: 'React Reconciliation', due: 0, mastery: 91, color: 'pink' },
];

export default function Revision() {
  const decks = DECKS;

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHead
        boxed={true}
        eyebrow="Spaced Repetition Engine"
        icon="Sparkles"
        iconColor="yellow"
        title="Multiverse Revision Deck"
        sub="Reinforce neural pathways from completed missions, AI transcript breakdowns, and mastery quizzes."
      />

      <div>
        <SectionTitle 
          icon="BookMarked" 
          right={`${decks.length} MISSIONS SAVED`}
        >
          Completed Missions & Study Decks
        </SectionTitle>

        {decks.length === 0 ? (
          <Card className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
            <Icon name="BookOpen" className="mb-6 h-16 w-16 text-muted opacity-50" />
            <h3 className="mb-2 font-sans text-lg font-bold uppercase text-ink">
              Your multiverse revision queue is empty
            </h3>
            <p className="mb-8 max-w-md text-sm font-medium text-muted">
              Watch video missions or complete mastery quizzes to automatically store study decks here.
            </p>
            <Link to="/courses">
              <Btn color="red" icon="Play">
                Explore course missions
              </Btn>
            </Link>
          </Card>
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
