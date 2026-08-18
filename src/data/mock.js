// All data is mocked. Swap these arrays for API calls later — the shapes are stable.

export const user = {
  name: 'Nirbhay',
  codename: 'NIRBHAY',
  email: 'nirbhay@adaptlearn.io',
  initial: 'N',
  rank: 'Web-Slinger',
  status: 'Active Multiverse User',
  network: 'Multiverse Network One',
  streak: 10,
  enrolled: 4,
  completed: 2,
  trophies: 3,
};

export const navItems = [
  { label: 'Dashboard', to: '/', icon: 'LayoutDashboard', color: 'red' },
  { label: 'Courses', to: '/courses', icon: 'BookOpen', color: 'blue' },
  { label: 'My Learning', to: '/my-learning', icon: 'GraduationCap', color: 'yellow' },
  { label: 'Revision', to: '/revision', icon: 'RotateCcw', color: 'pink' },
  { label: 'Projects', to: '/projects', icon: 'FlaskConical', color: 'sky' },
  { label: 'Interview Prep', to: '/interview-prep', icon: 'Mic', color: 'lime' },
  { label: 'Analytics', to: '/analytics', icon: 'BarChart3', color: 'red' },
  { label: 'People', to: '/people', icon: 'Users', color: 'blue' },
];

export const categories = ['All', 'AI / ML', 'Cybersecurity', 'Frontend', 'Backend', 'Data'];

export const courses = [
  {
    id: 'c1',
    title: 'Neural Networks & Deep Learning',
    blurb: 'Build intuition for backprop, gradients and layered representation from first principles.',
    category: 'AI / ML',
    level: 'Intermediate',
    missions: 14,
    hours: 9.5,
    color: 'red',
    tags: ['Backprop', 'CNN', 'Optimizers'],
    enrolled: true,
    progress: 62,
  },
  {
    id: 'c2',
    title: 'Natural Language Processing',
    blurb: 'From bag-of-words to attention. Tokenizers, embeddings and transformer internals.',
    category: 'AI / ML',
    level: 'Advanced',
    missions: 18,
    hours: 12,
    color: 'blue',
    tags: ['Tokenizers', 'Attention', 'Embeddings'],
    enrolled: true,
    progress: 28,
  },
  {
    id: 'c3',
    title: 'Web Exploitation & Defence',
    blurb: 'Break it, then fix it. XSS, CSRF, injection and the headers that stop them.',
    category: 'Cybersecurity',
    level: 'Intermediate',
    missions: 11,
    hours: 7,
    color: 'yellow',
    tags: ['XSS', 'CSRF', 'Headers'],
    enrolled: false,
    progress: 0,
  },
  {
    id: 'c4',
    title: 'React Rendering Internals',
    blurb: 'Reconciliation, fibers, and why your component re-rendered twelve times.',
    category: 'Frontend',
    level: 'Intermediate',
    missions: 9,
    hours: 5.5,
    color: 'pink',
    tags: ['Fiber', 'Hooks', 'Memo'],
    enrolled: true,
    progress: 81,
  },
  {
    id: 'c5',
    title: 'Systems Design for Scale',
    blurb: 'Queues, caches, shards and the trade-offs interviewers actually probe.',
    category: 'Backend',
    level: 'Advanced',
    missions: 16,
    hours: 11,
    color: 'sky',
    tags: ['Caching', 'Sharding', 'CAP'],
    enrolled: false,
    progress: 0,
  },
  {
    id: 'c6',
    title: 'Statistics for Machine Learning',
    blurb: 'Distributions, inference and the maths that stops your model lying to you.',
    category: 'Data',
    level: 'Beginner',
    missions: 12,
    hours: 6,
    color: 'lime',
    tags: ['Bayes', 'Inference', 'Sampling'],
    enrolled: false,
    progress: 0,
  },
];

export const featuredCourse = {
  id: 'f1',
  title: 'Transformers, End to End',
  blurb:
    'One mission chain that takes you from raw text to a working attention block you wrote yourself. No hand-waving, no imported magic.',
  level: 'Advanced',
  missions: 22,
  hours: 15,
  tags: ['Attention', 'Positional Encoding', 'Fine-tuning'],
};

export const preLearningTopics = [
  'Linear Algebra',
  'Gradient Descent',
  'Backpropagation',
  'Convolutions',
  'Recurrent Networks',
  'Attention Mechanism',
  'Regularisation',
  'Batch Normalisation',
];

export const velocityData = [
  { day: 'Mon', velocity: 3 },
  { day: 'Tue', velocity: 5 },
  { day: 'Wed', velocity: 4 },
  { day: 'Thu', velocity: 8 },
  { day: 'Fri', velocity: 6 },
  { day: 'Sat', velocity: 11 },
  { day: 'Sun', velocity: 9 },
];

export const learningTimeData = [
  { day: 'Mon', hours: 2.1 },
  { day: 'Tue', hours: 3.4 },
  { day: 'Wed', hours: 1.2 },
  { day: 'Thu', hours: 4.0 },
  { day: 'Fri', hours: 2.8 },
  { day: 'Sat', hours: 5.2 },
  { day: 'Sun', hours: 3.1 },
];

export const accuracyTrend = [
  { week: 'W1', accuracy: 54 },
  { week: 'W2', accuracy: 61 },
  { week: 'W3', accuracy: 58 },
  { week: 'W4', accuracy: 72 },
  { week: 'W5', accuracy: 79 },
  { week: 'W6', accuracy: 88 },
];

export const telemetryStats = [
  { label: 'Avg Daily Time', value: '2.7 hr', delta: '+12%', color: 'sky', icon: 'Clock' },
  { label: 'Quiz Accuracy', value: '88%', delta: '+6%', color: 'red', icon: 'Target' },
  { label: 'Concepts Mastered', value: '34', delta: '+4', color: 'yellow', icon: 'Brain' },
  { label: 'Weekly Progress', value: '76%', delta: '+18%', color: 'pink', icon: 'TrendingUp' },
];

export const projects = [
  {
    id: 'p1',
    title: 'Modern Portfolio Builder',
    blurb: 'Ship a responsive personal site with a component system you can defend in a review.',
    level: 'Beginner',
    color: 'red',
    stack: ['React', 'Tailwind', 'Vite', 'Netlify'],
    flow: ['Wireframe', 'Component system', 'Content pass', 'Deploy'],
  },
  {
    id: 'p2',
    title: 'REST Task API',
    blurb: 'CRUD with auth, validation and pagination. The one every backend interview asks about.',
    level: 'Intermediate',
    color: 'blue',
    stack: ['Node', 'Express', 'MongoDB', 'JWT'],
    flow: ['Schema design', 'Routes + auth', 'Validation', 'Docs + tests'],
  },
  {
    id: 'p3',
    title: 'Sentiment Analyzer',
    blurb: 'Classify text end to end — preprocessing, training loop, and an honest confusion matrix.',
    level: 'Intermediate',
    color: 'yellow',
    stack: ['Python', 'scikit-learn', 'pandas', 'Streamlit'],
    flow: ['Corpus prep', 'Vectorise', 'Train + tune', 'Serve UI'],
  },
  {
    id: 'p4',
    title: 'Realtime Chat Grid',
    blurb: 'Sockets, presence and optimistic updates without the state turning to soup.',
    level: 'Advanced',
    color: 'pink',
    stack: ['React', 'Socket.io', 'Redis', 'Docker'],
    flow: ['Socket layer', 'Presence', 'Optimistic UI', 'Load test'],
  },
];

export const badges = [
  { id: 'b1', name: 'Earth Crafter', note: 'Shipped a first project mission', color: 'red', unlocked: true, icon: 'Hammer' },
  { id: 'b2', name: 'Neural Explorer', note: 'Cleared 10 AI concept nodes', color: 'blue', unlocked: true, icon: 'Brain' },
  { id: 'b3', name: 'Quest Perfect', note: 'Score 100% on any mission quiz', color: 'yellow', unlocked: false, icon: 'Trophy' },
  { id: 'b4', name: 'Canon Keeper', note: 'Hold a 30-day streak', color: 'pink', unlocked: false, icon: 'Flame' },
  { id: 'b5', name: 'Spider-Sense', note: 'Answer 50 revision cards correctly', color: 'sky', unlocked: false, icon: 'Radar' },
  { id: 'b6', name: 'Multiverse Elite', note: 'Finish every mission in one track', color: 'lime', unlocked: false, icon: 'Star' },
];

export const people = [
  { id: 'u1', name: 'Aarya Deshmukh', rank: 'Neural Explorer', streak: 22, missions: 31, color: 'red' },
  { id: 'u2', name: 'Soham Kulkarni', rank: 'Web-Slinger', streak: 14, missions: 24, color: 'blue' },
  { id: 'u3', name: 'Riya Nair', rank: 'Canon Keeper', streak: 41, missions: 52, color: 'yellow' },
  { id: 'u4', name: 'Kabir Shah', rank: 'Earth Crafter', streak: 7, missions: 12, color: 'pink' },
  { id: 'u5', name: 'Meera Iyer', rank: 'Multiverse Elite', streak: 63, missions: 88, color: 'sky' },
];

// One year of daily activity for the profile heatmap. Deterministic so it never
// reshuffles between renders.
export function buildActivity() {
  const cells = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 371; i++) {
    const r = rand();
    cells.push(r > 0.82 ? 4 : r > 0.68 ? 3 : r > 0.5 ? 2 : r > 0.3 ? 1 : 0);
  }
  return cells;
}
