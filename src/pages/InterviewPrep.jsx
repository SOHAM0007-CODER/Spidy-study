import React, { useState, useRef, useEffect } from 'react';
import { askInterviewer, hasKey } from '../lib/ai';
import { courses } from '../data/mock';
import { Card, Btn, Tag, Icon } from '../components/ui';

export default function InterviewPrep() {
  const enrolledCourses = courses.filter((c) => c.enrolled);
  
  const welcomeBubble = {
    role: 'assistant',
    content: `Welcome to your Multiverse AI Mock Interview! I've analyzed your progress in ${enrolledCourses.length} courses. Let's test your depth!`
  };

  const [messages, setMessages] = useState([welcomeBubble]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  // Fire first API call on mount
  useEffect(() => {
    if (!hasStarted && messages.length === 1 && hasKey) {
      setHasStarted(true);
      send([welcomeBubble, { role: 'user', content: 'Begin the interview.' }], true);
    }
  }, [hasStarted, messages.length]);

  async function send(history, isBootstrap = false) {
    setBusy(true);
    setError('');
    
    // For the API call, we exclude the initial welcome message as it's not part of the real dialogue
    // If it's bootstrap, we just send empty history (or the 'Begin the interview' prompt).
    // Actually, `askInterviewer` just takes the `messages` array.
    const apiHistory = history.slice(1).map(m => ({ role: m.role, content: m.content }));
    
    try {
      const reply = await askInterviewer({ 
        messages: apiHistory, 
        enrolledCourses: enrolledCourses.map(c => c.title) 
      });
      
      // Parse META
      let meta = null;
      const lines = reply.split('\n');
      const cleanLines = [];
      for (const line of lines) {
        if (line.trim().startsWith('META:')) {
          meta = line.replace('META:', '').trim();
        } else {
          cleanLines.push(line);
        }
      }
      
      const cleanReply = cleanLines.join('\n').trim();
      
      // If it was the bootstrap call, we replace the hidden user message with the new assistant message
      if (isBootstrap) {
        setMessages([welcomeBubble, { role: 'assistant', content: cleanReply, meta }]);
      } else {
        setMessages([...history, { role: 'assistant', content: cleanReply, meta }]);
      }
      
    } catch (e) {
      setError(e.message);
      // Revert history on error
      if (isBootstrap) {
        setMessages([welcomeBubble]);
        setHasStarted(false);
      } else {
        setMessages(history);
      }
    } finally {
      setBusy(false);
    }
  }

  function submit() {
    const text = draft.trim();
    if (!text || busy) return;
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setDraft('');
    send(next);
  }

  function reset() {
    setMessages([welcomeBubble]);
    setDraft('');
    setError('');
    setHasStarted(false);
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col space-y-6">
      {/* Page Header (Bare) */}
      <div>
        <Tag color="yellow" className="mb-2 shadow-nbsm">AI SIMULATION</Tag>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h1 className="flex items-center gap-3 font-display text-3xl md:text-4xl uppercase leading-none mt-1 heading-shadow text-ink">
            <Icon name="MessageSquare" className="h-8 w-8 text-cyan shrink-0" />
            Multiverse Interview Prep
          </h1>
          <div>
            <Btn color="card" icon="RotateCcw" onClick={reset}>
              New session
            </Btn>
          </div>
        </div>
        <div className="mt-4 border-b-[3px] border-ink w-full" />
      </div>

      {!hasKey && (
        <Card color="yellow" className="flex items-start gap-3 p-4 shrink-0">
          <Icon name="KeyRound" className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="text-sm font-bold">
            No API key found. Create a <code className="font-mono">.env</code> file in the project root
            with <code className="font-mono">VITE_ANTHROPIC_API_KEY=your-key</code>, then restart the
            dev server. Everything else on this page still works.
          </div>
        </Card>
      )}

      {/* Chat Panel */}
      <Card className="flex flex-1 flex-col overflow-hidden bg-card min-h-[520px]">
        {/* Message Scroll Area */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6 lg:p-8">
          {messages.map((m, i) => {
            const isUser = m.role === 'user';
            // Hide the hidden bootstrap user message
            if (isUser && m.content === 'Begin the interview.' && i === 1) return null;
            
            return (
              <div key={i} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                
                {/* Assistant Avatar (Outside left) */}
                {!isUser && (
                  <div className="mr-3 mt-2 shrink-0">
                    <span className="grid h-9 w-9 md:h-11 md:w-11 place-items-center rounded-full border-3 border-ink bg-red text-onaccent shadow-nbsm">
                      <Icon name="Bot" className="h-5 w-5 md:h-6 md:w-6" />
                    </span>
                  </div>
                )}

                {/* Bubble Container (allows relative positioning of banner) */}
                <div className={`relative ${isUser ? 'max-w-[75%]' : 'max-w-[90%] md:max-w-[85%]'}`}>
                  
                  {/* Difficulty Banner */}
                  {!isUser && m.meta && (
                    <div className="absolute -top-4 -left-3 z-10 banner-taper border-3 border-ink bg-yellow px-4 py-0.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink shadow-nbsm">
                      {m.meta}
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`border-3 border-ink px-5 py-4 text-sm font-semibold shadow-nb rounded-xl ${
                      isUser ? 'bg-cyan text-ink' : 'bg-paper text-ink mt-2'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Thinking Indicator */}
          {busy && (
            <div className="flex w-full justify-start animate-pop">
              <div className="mr-3 mt-2 shrink-0">
                <span className="grid h-9 w-9 md:h-11 md:w-11 place-items-center rounded-full border-3 border-ink bg-red text-onaccent shadow-nbsm">
                  <Icon name="Bot" className="h-5 w-5 md:h-6 md:w-6" />
                </span>
              </div>
              <div className="mt-2 border-3 border-ink bg-paper px-5 py-4 shadow-nb rounded-xl flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex justify-center">
              <div className="border-3 border-ink bg-red p-3 text-sm font-bold text-onaccent shadow-nbsm max-w-lg text-center rounded-lg">
                {error}
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>
      </Card>

      {/* Input Bar (Separate) */}
      <div className="flex items-center gap-3 shrink-0 pb-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          disabled={busy}
          rows={1}
          placeholder="TYPE YOUR ANSWER..."
          className="flex-1 resize-none rounded-xl border-3 border-ink bg-card px-5 py-4 text-sm font-mono uppercase font-semibold placeholder:font-bold placeholder:text-muted focus:outline-none focus:ring-4 focus:ring-cyan/50 shadow-nb disabled:opacity-50"
          style={{ minHeight: '56px' }}
        />
        <button
          onClick={submit}
          disabled={busy || !draft.trim()}
          className="flex shrink-0 items-center justify-center rounded-xl border-3 border-ink bg-pink px-6 py-4 shadow-nb hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-nblg active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbsm disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-nb transition-all duration-100 text-onaccent"
        >
          <Icon name="Send" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
