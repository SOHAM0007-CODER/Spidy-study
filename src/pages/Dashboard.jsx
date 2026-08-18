import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer } from 'recharts';
import { user, velocityData, badges } from '../data/mock';
import { Card, Btn, Tag, Icon, SectionTitle } from '../components/ui';
import { useTheme } from '../lib/theme';
import HeroArt from '../components/HeroArt';

export default function Dashboard() {
  const { theme } = useTheme();
  const [c, setC] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setC({
        border: `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--c-border').trim()})`,
        cyan: `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--c-cyan').trim()})`,
        red: `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--c-red').trim()})`,
        ink: `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--c-border').trim()})`,
      });
    }, 10);
    return () => clearTimeout(timer);
  }, [theme]);

  const hasEnrolled = user.enrolled > 0;
  
  // Velocity calculation
  const totalVelocity = velocityData.reduce((acc, curr) => acc + curr.velocity, 0);
  const avgVelocity = totalVelocity / velocityData.length;

  // Progress stats
  const unlockedBadges = badges.filter(b => b.unlocked).length;

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* ROW 1 */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* HERO PANEL */}
        <Card className="relative overflow-hidden min-h-[300px] border-0 ring-3 ring-ink bg-gradient-to-r from-red via-pink to-violet-800 p-8 sm:p-10 flex flex-col justify-center">
          <div className="absolute inset-0 halftone text-onaccent/20" />
          
          <HeroArt className="absolute bottom-0 right-0 h-[115%] w-auto object-contain object-bottom pointer-events-none hidden md:block drop-shadow-xl" />

          <div className="relative z-10 max-w-xl flex flex-col items-start w-full md:w-1/2">
            <div className="rounded-lg border-3 border-ink bg-yellow px-3 py-1 font-display uppercase text-ink shadow-nbsm inline-block mb-6 -rotate-1">
              * Multiverse Learning HQ *
            </div>
            
            <h1 className="heading-shadow font-display text-4xl uppercase leading-[1.1] tracking-tight text-onaccent sm:text-5xl mb-5 max-w-[500px]">
              {hasEnrolled ? "Ready to continue your mission?" : "Ready to start your first course today?"}
            </h1>
            
            <p className="mb-8 font-bold text-onaccent text-lg">
              Your cognitive patterns look great. Keep up the multiverse momentum!
            </p>
            
            <Link to={hasEnrolled ? "/my-learning" : "/courses"}>
              <Btn color="cyan" icon={hasEnrolled ? "Play" : "Rocket"} className="text-ink">
                {hasEnrolled ? "Resume Learning" : "Start First Course"}
              </Btn>
            </Link>
          </div>
        </Card>

        {/* REVISION QUEUE CARD */}
        <Card className="flex flex-col p-6">
          <div className="flex items-center gap-2 mb-8">
            <Icon name="Clock" className="h-5 w-5 text-cyan" />
            <h2 className="font-display uppercase text-xl">Revision Queue</h2>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Icon name="CheckCircle2" className="h-16 w-16 text-cyan mb-4" />
            <h3 className="font-display text-2xl uppercase tracking-wide">Queue Clear!</h3>
          </div>
          
          <div className="mt-8">
            <Link to="/my-learning">
              <Btn color="card" icon="ChevronRight" iconPosition="right" className="w-full justify-center">
                View Learning Wall
              </Btn>
            </Link>
          </div>
        </Card>
      </div>

      {/* ROW 2 */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* LEARNING VELOCITY */}
        <div className="lg:col-span-2 space-y-4">
          <SectionTitle icon="BarChart3">Learning Velocity</SectionTitle>
          <Card className="p-6 h-64 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 text-cyan">
                <Icon name="Zap" className="h-4 w-4" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Weekly Neural Output</span>
              </div>
              <Tag color="yellow">+28% Velocity</Tag>
            </div>
            <div className="border-b-[1px] border-ink mb-6" />
            
            <div className="flex-1">
              {c && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={velocityData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fontWeight: 700, fill: c.border }} 
                      dy={10}
                    />
                    <Bar 
                      dataKey="velocity" 
                      radius={[8, 8, 0, 0]} 
                      stroke={c.ink} 
                      strokeWidth={3}
                    >
                      {velocityData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.velocity > avgVelocity ? c.red : c.cyan} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>

        {/* YOUR PROGRESS */}
        <div className="space-y-4">
          <SectionTitle icon="Target">Your Progress</SectionTitle>
          <div className="flex flex-col gap-4 h-64">
            <Card className="flex items-center p-4 h-1/2">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border-3 border-ink bg-red text-onaccent shadow-nbsm mr-4">
                <Icon name="Trophy" className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-4xl leading-none">{user.completed}</div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted mt-1">Completed</div>
              </div>
            </Card>
            <Card className="flex items-center p-4 h-1/2">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border-3 border-ink bg-yellow text-ink shadow-nbsm mr-4">
                <Icon name="Zap" className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-4xl leading-none">{unlockedBadges}</div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted mt-1">Badges</div>
              </div>
            </Card>
          </div>
        </div>

        {/* CURRENT GOAL */}
        <div className="space-y-4">
          <SectionTitle icon="Rocket">Current Goal</SectionTitle>
          <Card className="p-6 h-64 flex flex-col">
            <div className="mb-4">
              <Tag color="yellow">Mastery Goal</Tag>
            </div>
            
            <h3 className="font-display text-2xl uppercase mb-6 leading-tight">Pick A Course</h3>
            
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest">
              <span>Progress</span>
              <span>0%</span>
            </div>
            
            <div className="h-3 w-full rounded-full border-3 border-ink bg-card mb-auto overflow-hidden">
              <div className="h-full bg-red w-0" />
            </div>
            
            <Link to="/courses" className="mt-6 block">
              <Btn color="red" className="w-full">
                Browse all
              </Btn>
            </Link>
          </Card>
        </div>
      </div>

    </div>
  );
}
