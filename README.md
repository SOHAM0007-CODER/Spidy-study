# 🕷️ SPIDYSTUDY — Multiverse Learning HQ

A stunning Neubrutalist, full-stack adaptive-learning dashboard designed for heroes of the multiverse. Built with a modern React stack and powered by Supabase for secure authentication and data persistence.

## ✨ Features

- **Secure Authentication**: Full-stack authentication powered by **Supabase**. Includes secure Email & Password login, and **Google OAuth** integration out of the box.
- **Persistent Sessions**: React Router protected routes with global session listeners that securely hydrate your identity upon return.
- **Multiverse Telemetry (Dashboard)**: Real-time velocity charts, cognitive telemetry, and a one-year learning activity heatmap.
- **AI Interview Prep**: Live mock interviews powered by the real Anthropic API (Claude).
- **Responsive Neubrutalist Design**: Consistent 3px black borders, hard offset shadows (`shadow-nb`), zero border-radius, and flat vibrant fills.
- **Dynamic Routing**: Built with React Router v6, featuring protected routes and a responsive collapsible sidebar.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + PostCSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM

### Backend & Services
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **OAuth Providers**: Google Cloud Console
- **AI Integration**: Anthropic API
- **Hosting & CI/CD**: Vercel

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/SOHAM0007-CODER/Spidy-study.git
cd Spidy-study
npm install
```

### 2. Environment Variables
Create a `.env` file in the root of the project and add your required keys:

```env
# Supabase Configuration (Required for Auth)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# AI Configuration (Optional)
VITE_ANTHROPIC_API_KEY=sk-ant-...
```
> **Note:** Without the Anthropic key, the app still works perfectly! The Interview Prep page will gracefully show a missing-key notice instead of breaking.

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser!

---

## 🔐 Authentication Setup

This project is deeply integrated with Supabase Auth. To configure it for your own fork:

1. Create a new project on [Supabase](https://supabase.com).
2. Go to **Authentication > URL Configuration**.
   - Set **Site URL** to your production domain (e.g., `https://spidy-study.vercel.app`).
   - Add `http://localhost:5173/*` to **Redirect URLs** so local development works.
3. Enable **Google** in the Providers menu and paste your Google Cloud OAuth Client ID and Secret.

---

## 🎨 Design System & Tokens

We use a strict **Neubrutalist** aesthetic. Buttons physically press down on `:active` (shadow collapses, element translates). Gradients are forbidden (except for specific multiverse effects).

| Token | Value | Use |
|---|---|---|
| `ink` | `#101014` | All borders, all shadows, body text |
| `paper` | `#F5F0E6` | Page background (with halftone dots) |
| `red` | `#FF3B30` | Primary action, brand |
| `blue` | `#2D5BFF` | Secondary / featured |
| `cyan` | `#4CC9F0` | Stat accents, futuristic elements |
| `yellow` | `#FFD426` | Streak, highlights, selected |
| `pink` | `#FF5CA8` | Revision / Heatmap |

**Typography:**
- **Archivo Black**: Display headers and major numbers.
- **Inter**: Standard body text and paragraphs.
- **JetBrains Mono**: Telemetry labels, stats, and small utility text.

---

## 🌍 Deployment

This project is optimized for deployment on **Vercel**. 
1. Import your GitHub repository into Vercel.
2. In the Vercel project settings, navigate to **Environment Variables**.
3. Add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` variables.
4. Deploy!

*(Remember to push all your local code to GitHub before deploying!)*
