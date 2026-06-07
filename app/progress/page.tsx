'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { useDisplayName } from '@/lib/useDisplayName'
import { progressStats, milestones } from '@/lib/mockData'

const WHEN = ['This week', '2 weeks ago', 'Last month', 'Day one']

export default function ProgressPage() {
  const name = useDisplayName()

  return (
    <AppLayout active="progress" name={name}>
      <div className="page">
        <header className="page-head">
          <div className="eyebrow">Progress Journey</div>
          <h1>Your <span className="grad">journey</span> so far.</h1>
          <p className="lede">{name}, here&apos;s how far you&apos;ve come since you started. Every dot is a day you showed up.</p>
        </header>

        <div className="stat-row">
          {progressStats.map((s, i) => (
            <div key={i} className="vcard stat">
              <div className={`n${i === 0 ? ' g' : ''}`}>{s.n}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid2">
          <div className="vcard">
            <div className="kicker">CONSISTENCY</div>
            <h3>Last 12 Weeks</h3>
            <svg className="line-chart" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lg" x1="0" x2="1"><stop offset="0%" stopColor="#4DA3FF" /><stop offset="50%" stopColor="#8A5BFF" /><stop offset="100%" stopColor="#FF3CAC" /></linearGradient>
                <linearGradient id="lgf" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="rgba(138,91,255,0.35)" /><stop offset="100%" stopColor="rgba(138,91,255,0)" /></linearGradient>
              </defs>
              <path d="M0,180 C60,160 90,120 150,130 S250,90 300,80 S400,60 450,50 S560,30 600,24 L600,220 L0,220 Z" fill="url(#lgf)" />
              <path d="M0,180 C60,160 90,120 150,130 S250,90 300,80 S400,60 450,50 S560,30 600,24" fill="none" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="vcard">
            <div className="kicker">MILESTONES</div>
            <h3>What You&apos;ve Hit</h3>
            <div className="timeline" style={{ marginTop: 16 }}>
              {milestones.map((m, i) => {
                const last = i === milestones.length - 1
                return (
                  <div key={i} className="tl-item">
                    <div className="tl-rail">
                      <div className={`tl-dot${last ? ' dim' : ''}`} />
                      {!last && <div className="tl-line" />}
                    </div>
                    <div>
                      <div className="tl-when">{WHEN[i]}</div>
                      <div className="tl-what">{m.title} — <b>{m.meta}</b></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
