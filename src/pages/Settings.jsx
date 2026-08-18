import React, { useState } from 'react';
import { user } from '../data/mock';
import { Card, Btn, Icon, PageHead, SectionTitle } from '../components/ui';

function Toggle({ on, onChange, label, note }) {
  return (
    <div className="flex items-center justify-between gap-4 border-3 border-ink bg-card p-4">
      <div>
        <div className="text-sm font-bold">{label}</div>
        <div className="mt-0.5 text-xs font-medium text-muted">{note}</div>
      </div>
      <button
        onClick={() => onChange(!on)}
        role="switch"
        aria-checked={on}
        aria-label={label}
        className={`flex h-8 w-14 shrink-0 items-center border-3 border-ink p-0.5 transition-colors ${
          on ? 'justify-end bg-lime' : 'justify-start bg-paper'
        }`}
      >
        <span className="h-full w-6 border-2 border-ink bg-ink" />
      </button>
    </div>
  );
}

export default function Settings() {
  const [prefs, setPrefs] = useState({ reminders: true, sound: false, hardMode: true, digest: true });
  const set = (k) => (v) => setPrefs((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-8">
      <PageHead eyebrow="Control Room" title="Settings" sub="Tune how the multiverse talks back to you." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionTitle>Account</SectionTitle>
          <Card className="space-y-4 p-5">
            {[
              ['Display name', user.name],
              ['Email', user.email],
              ['Hero codename', user.codename],
            ].map(([label, value]) => (
              <label key={label} className="block">
                <span className="eyebrow text-muted">{label}</span>
                <input
                  defaultValue={value}
                  className="mt-1.5 w-full border-3 border-ink bg-paper px-3 py-2.5 text-sm font-bold focus:outline-none"
                />
              </label>
            ))}
            <Btn color="red" icon="Save">
              Save changes
            </Btn>
          </Card>
        </div>

        <div>
          <SectionTitle>Preferences</SectionTitle>
          <div className="space-y-3">
            <Toggle on={prefs.reminders} onChange={set('reminders')} label="Daily mission reminder" note="A nudge at 8 PM if the streak is at risk" />
            <Toggle on={prefs.sound} onChange={set('sound')} label="Interface sound" note="Clicks and confirmation tones" />
            <Toggle on={prefs.hardMode} onChange={set('hardMode')} label="Hard mode quizzes" note="Fewer hints, tighter timers" />
            <Toggle on={prefs.digest} onChange={set('digest')} label="Weekly telemetry digest" note="Sunday email with your accuracy trend" />
          </div>

          <SectionTitle right={null}>
            <span className="mt-6 block">Danger zone</span>
          </SectionTitle>
          <Card color="red" className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Icon name="AlertTriangle" className="h-5 w-5" />
              <span className="text-sm font-bold">Reset all mission progress</span>
            </div>
            <Btn color="card">Reset</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
}
