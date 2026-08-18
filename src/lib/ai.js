// Talks to the Anthropic Messages API directly from the browser.
// Fine for a demo / competition build. For production, proxy this through a
// small server so the key never ships to the client.

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const MODEL = 'claude-sonnet-4-5';

export const hasKey = Boolean(API_KEY);

const SYSTEM = `You are the ADAPTLearn Multiverse AI Mock Interviewer.

Style: sharp, warm, and direct — like a senior engineer who wants the candidate to
actually pass. Never robotic, never flattering.

Rules:
- Ask ONE question at a time, then wait.
- Open with a short greeting plus your first question.
- After each candidate answer: give a two-line verdict (what was right, what was
  missing), then immediately ask the next question.
- Scale difficulty to the level given. Probe deeper when an answer is strong.
- Keep every reply under 120 words. No markdown headings, no bullet dumps.
- After the 6th question, stop asking and give a final debrief: score out of 10,
  two strengths, two things to revise.`;

export async function askInterviewer({ messages, topic, level }) {
  if (!API_KEY) {
    throw new Error('No API key. Add VITE_ANTHROPIC_API_KEY to your .env file and restart the dev server.');
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 700,
      system: `${SYSTEM}\n\nTopic: ${topic}\nLevel: ${level}`,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  return data.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
}
