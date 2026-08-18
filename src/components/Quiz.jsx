import React, { useState } from 'react';
import { Card, Btn, Icon } from './ui';

export function Quiz({ questions, courseId, onFinish }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const currentQ = questions[currentIdx];
  const isLocked = selected !== null;

  const handleSelect = (idx) => {
    if (isLocked) return;
    setSelected(idx);
    
    // Save answer
    const isCorrect = idx === currentQ.correct;
    setAnswers((prev) => [...prev, isCorrect]);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setSelected(null);
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResults(true);
      const finalScore = answers.filter(Boolean).length;
      onFinish?.(finalScore);
    }
  };

  const handleRetake = () => {
    setCurrentIdx(0);
    setSelected(null);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = answers.filter(Boolean).length;
    let verdict = '';
    if (score < 5) verdict = 'Run the revision queue before retrying';
    else if (score <= 7) verdict = 'Solid, a few gaps left';
    else verdict = 'Mission mastered';

    return (
      <Card color="paper" className="p-6 md:p-10">
        <div className="text-center">
          <div className="eyebrow text-muted mb-2">Quiz Results</div>
          <div className="font-display text-7xl leading-none">{score} / {questions.length}</div>
          <div className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-ink/70">
            {verdict}
          </div>
        </div>

        <div className="mt-10 space-y-3 border-y-3 border-ink py-6">
          {questions.map((q, i) => (
            <div key={q.id} className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">
                {answers[i] ? (
                  <div className="grid h-5 w-5 place-items-center border-2 border-ink bg-lime">
                    <Icon name="Check" className="h-3 w-3 text-ink" />
                  </div>
                ) : (
                  <div className="grid h-5 w-5 place-items-center border-2 border-ink bg-red">
                    <Icon name="X" className="h-3 w-3 text-ink" />
                  </div>
                )}
              </div>
              <p className="text-sm font-semibold">{q.prompt}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Btn color="card" onClick={handleRetake} className="flex-1">
            Retake quiz
          </Btn>
          <Btn color="yellow" onClick={() => onFinish?.(score)} className="flex-1">
            Back to missions
          </Btn>
        </div>
      </Card>
    );
  }

  return (
    <Card color="paper" className="p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="font-mono text-[10px] font-bold uppercase tracking-widest">
          Question {currentIdx + 1} of {questions.length}
        </div>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-6 border-2 border-ink transition-colors ${
                i < currentIdx ? 'bg-ink' : i === currentIdx ? 'bg-yellow' : 'bg-card'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Prompt */}
      <h2 className="font-display text-2xl uppercase leading-tight md:text-3xl mb-8">
        {currentQ.prompt}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        {currentQ.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selected === idx;
          const isCorrectAnswer = currentQ.correct === idx;
          
          let btnClass = 'bg-card text-ink hover:bg-yellow hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-nb transition-all active:translate-x-0 active:translate-y-0 active:shadow-nbsm';
          let tileClass = 'bg-yellow';
          let icon = null;

          if (isLocked) {
            btnClass = 'bg-card text-ink cursor-default opacity-80'; // default locked state
            tileClass = 'bg-paper';
            if (isCorrectAnswer) {
              btnClass = 'bg-lime text-ink translate-x-[2px] translate-y-[2px] shadow-nbpress';
              tileClass = 'bg-ink text-paper';
              icon = <Icon name="Check" className="h-4 w-4" />
            } else if (isSelected && !isCorrectAnswer) {
              btnClass = 'bg-red text-ink translate-x-[2px] translate-y-[2px] shadow-nbpress';
              tileClass = 'bg-ink text-paper';
              icon = <Icon name="X" className="h-4 w-4" />
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isLocked}
              className={`w-full text-left border-3 border-ink shadow-nbsm flex items-center p-2 outline-none focus-visible:ring-4 ring-blue ${btnClass}`}
            >
              <div className={`grid h-8 w-8 flex-shrink-0 place-items-center border-3 border-ink font-mono text-xs font-bold ${tileClass}`}>
                {icon ? icon : letter}
              </div>
              <span className="ml-4 flex-1 text-sm font-bold">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {isLocked && (
        <div className="mt-8 animate-pop">
          <div className="mb-6 border-l-4 border-ink bg-card p-4 text-sm font-medium italic shadow-nbsm">
            {currentQ.explanation}
          </div>
          <div className="flex justify-end">
            <Btn color="blue" icon="ArrowRight" onClick={handleNext}>
              {currentIdx < questions.length - 1 ? 'Next question' : 'See results'}
            </Btn>
          </div>
        </div>
      )}
    </Card>
  );
}
