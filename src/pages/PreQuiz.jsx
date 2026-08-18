import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/mock';
import { Card, Btn, Tag, Icon } from '../components/ui';

export default function PreQuiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const courseId = searchParams.get('courseId');
  const title = searchParams.get('title') || 'Untitled mission';
  
  const course = courses.find(c => c.id === courseId);
  const topics = course?.topics || [
    'Dimensional Briefing & Core Architecture', 
    'Fundamental Patterns & Quantum Setup', 
    'Hands-On Mission: Practical Implementation', 
    'Advanced Multiverse Scaling & Optimizations', 
    'Mission Debrief & Real-World Integration'
  ];

  const [selected, setSelected] = useState(new Set());

  const toggle = (idx) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleStart = () => {
    navigate(`/mission/${courseId}`, { state: { preKnownTopics: Array.from(selected) } });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-fade-in">
      {/* Header Panel */}
      <Card className="relative overflow-hidden p-6 sm:p-10 bg-gradient-to-r from-pink to-ink border-0 ring-3 ring-ink">
        <div className="absolute inset-0 halftone text-onaccent/10" />
        <div className="relative z-10 flex flex-col items-start">
          <div className="rounded-lg border-3 border-ink bg-yellow px-3 py-1 font-display uppercase text-ink shadow-nbsm inline-block mb-6 -rotate-1">
            Pre-Learning Assessment
          </div>
          <h1 className="heading-split font-display text-4xl uppercase leading-none tracking-tight text-onaccent sm:text-5xl lg:text-6xl max-w-3xl">
            Which concepts are you already familiar with?
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium uppercase tracking-wide text-onaccent/85 sm:text-lg">
            Select the topics you've studied before. We'll skip you on them to personalise your learning path. You can also skip to watch the video directly.
          </p>
          <div className="mt-6 flex items-center gap-2 text-cyan font-bold">
            <Icon name="Sparkles" className="h-5 w-5" />
            <span className="uppercase font-display tracking-wide">{title}</span>
          </div>
        </div>
      </Card>

      {/* Topics Card */}
      <Card className="p-6 sm:p-8">
        <div className="mb-6 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
          Topics in this video ({topics.length} found)
        </div>
        <div className="flex flex-col items-start gap-3">
          {topics.map((topic, idx) => {
            const isSelected = selected.has(idx);
            const num = String(idx + 1).padStart(2, '0');
            return (
              <button
                key={idx}
                aria-pressed={isSelected}
                onClick={() => toggle(idx)}
                className={`flex w-full sm:w-auto max-w-full items-center gap-4 rounded-lg border-3 border-ink px-4 py-3 text-left transition-all duration-100 hover:-translate-y-[2px] shadow-nbsm hover:shadow-nb focus:outline-none focus:ring-4 focus:ring-cyan/50 ${
                  isSelected ? 'bg-cyan text-ink' : 'bg-paper text-ink'
                }`}
              >
                <span className="font-mono text-sm font-bold opacity-60">
                  {num}.
                </span>
                <span className="font-display uppercase text-sm sm:text-base leading-tight truncate">
                  {topic}
                </span>
                {isSelected && (
                  <Icon name="CheckCircle2" className="ml-2 h-5 w-5 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Footer Action Row */}
      <div className="flex flex-col-reverse sm:flex-row items-center gap-4 sm:gap-6 pt-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
          {selected.size} of {topics.length} topics selected
        </span>
        <div className="flex w-full sm:w-auto flex-1 justify-end gap-3">
          <Btn color="card" onClick={handleStart} className="flex-1 sm:flex-none">
            Skip to video
          </Btn>
          <Btn color="red" icon="Play" onClick={handleStart} className="flex-1 sm:flex-none">
            Start mission
          </Btn>
        </div>
      </div>
    </div>
  );
}
