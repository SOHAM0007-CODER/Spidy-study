import React, { useState, useRef, useEffect } from 'react';
import { askInterviewer, hasKey } from '../lib/ai';
import { Card, Btn, Tag, Chip, Icon, PageHead } from '../components/ui';

const TOPICS = ['Neural Networks', 'NLP & Transformers', 'React Internals', 'System Design', 'DBMS & SQL'];
const LEVELS = ['Conceptual', 'Intermediate', 'Advanced'];

export default function InterviewPrep() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [level, setLevel] = useState('Intermediate');
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  async function send(history) {
    setBusy(true);
    setError('');
    try {
      const reply = await askInterviewer({ messages: history, topic, level });
      setMessages([...history, { role: 'assistant', content: reply }]);
    } catch (e) {
      setError(e.message);
      setMessages(history);
    } finally {
      setBusy(false);
    }
  }

  function begin() {
    setStarted(true);
    const opener = [
      {
        role: 'user',
        content: `Begin the mock interview on ${topic} at ${level} level. Greet me briefly and ask your first question.`,
      },
    ];
    setMessages(opener);
    send(opener);
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
    setStarted(false);
    setMessages([]);
    setDraft('');
    setError('');
  }

  const visible = messages.slice(1); // hide the bootstrap instruction

  return (
    <div className="space-y-8">
      <PageHead
        eyebrow="AI Simulator"
        badge={hasKey ? 'Live' : 'Key missing'}
        title="Multiverse Interview Prep"
        sub="A real interviewer that pushes back. One question at a time, verdict after each answer."
        right={
          started && (
            <Btn color="card" icon="RefreshCw" onClick={reset}>
              New session
            </Btn>
          )
        }
      />

      {!hasKey && (
        <Card color="yellow" className="flex items-start gap-3 p-4">
          <Icon name="KeyRound" className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="text-sm font-bold">
            No API key found. Create a <code className="font-mono">.env</code> file in the project root
            with <code className="font-mono">VITE_ANTHROPIC_API_KEY=your-key</code>, then restart the
            dev server. Everything else on this page still works.
          </div>
        </Card>
      )}

      {!started ? (
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-xl uppercase">Configure the simulation</h2>

          <div className="mt-6">
            <div className="eyebrow mb-2 text-muted">Topic</div>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="eyebrow mb-2 text-muted">Difficulty</div>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                  {l}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t-3 border-ink pt-6">
            <Btn color="red" icon="Mic" onClick={begin} disabled={!hasKey}>
              Start mock interview
            </Btn>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted">
              6 questions · {topic} · {level}
            </span>
          </div>
        </Card>
      ) : (
        <Card className="flex h-[calc(100vh-19rem)] min-h-[440px] flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b-3 border-ink bg-blue px-4 py-3 text-ink">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center border-3 border-ink bg-yellow text-ink">
                <Icon name="Bot" className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-sm uppercase leading-none">Multiverse AI Mock</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[.18em]">
                  {topic} · {level}
                </div>
              </div>
            </div>
            <Tag color="yellow">{busy ? 'Thinking' : 'Ready'}</Tag>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-paper p-4">
            {visible.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] border-3 border-ink px-4 py-3 text-sm font-semibold shadow-nbsm sm:max-w-[75%] ${
                    m.role === 'user' ? 'bg-yellow' : 'bg-card'
                  }`}
                >
                  <div className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[.18em] text-muted">
                    {m.role === 'user' ? 'You' : 'Interviewer'}
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 border-3 border-ink bg-card px-4 py-3 shadow-nbsm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2.5 w-2.5 animate-bounce border-2 border-ink bg-red"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="border-3 border-ink bg-red p-3 text-sm font-bold text-onaccent shadow-nbsm">
                {error}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex items-end gap-2 border-t-3 border-ink bg-card p-3">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              rows={2}
              placeholder="Type your answer… (Enter to send, Shift+Enter for a new line)"
              className="flex-1 resize-none border-3 border-ink bg-paper px-3 py-2 text-sm font-semibold placeholder:font-medium placeholder:text-muted focus:outline-none"
            />
            <Btn color="red" icon="Send" onClick={submit} disabled={busy || !draft.trim()}>
              Send
            </Btn>
          </div>
        </Card>
      )}
    </div>
  );
}
