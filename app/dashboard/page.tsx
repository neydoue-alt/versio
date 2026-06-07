'use client'

import { useEffect, useRef, useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { useDisplayName } from '@/lib/useDisplayName'
import { aiReply } from '@/lib/aiReply'
import { SUGGESTIONS, goals as initialGoals, habits, moodWeek } from '@/lib/mockData'

const TODAY = (() => {
  const d = new Date()
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  return `${days[d.getDay()]} · ${months[d.getMonth()]} ${d.getDate()}`
})()

type Msg = { who: 'ai' | 'user'; text: string }

export default function DashboardPage() {
  const name = useDisplayName()

  const [si, setSi] = useState(0)
  const [suggIn, setSuggIn] = useState(true)
  const [doneTonight, setDoneTonight] = useState(false)
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [goalList, setGoalList] = useState(initialGoals)

  const [messages, setMessages] = useState<Msg[]>([])
  const [greeted, setGreeted] = useState(false)
  const [typing, setTyping] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const msgAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (greeted || name === 'Friend') return
    setGreeted(true)
    setMessages([{ who: 'ai', text: `Welcome in, ${name}. I built this around what you told me. We'll start tiny — one small move tonight. Sound good?` }])
  }, [name, greeted])

  useEffect(() => {
    const el = msgAreaRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  function handleDoTonight() {
    if (doneTonight) return
    setDoneTonight(true)
    if (doneTimer.current) clearTimeout(doneTimer.current)
    doneTimer.current = setTimeout(() => setDoneTonight(false), 3200)
  }

  function handleSuggestElse() {
    setSuggIn(false)
    setTimeout(() => {
      setSi((i) => (i + 1) % SUGGESTIONS.length)
      setSuggIn(true)
      if (doneTimer.current) clearTimeout(doneTimer.current)
      setDoneTonight(false)
    }, 280)
  }

  function toggleGoal(idx: number) {
    setGoalList((list) => list.map((g, i) => (i === idx ? { ...g, done: !g.done } : g)))
  }

  async function handleChatSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = chatInput.trim()
    if (!text) return
    setMessages((m) => [...m, { who: 'user', text }])
    setChatInput('')
    setTyping(true)
    const reply = await aiReply(text)
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 600))
    setTyping(false)
    setMessages((m) => [...m, { who: 'ai', text: reply }])
  }

  const sugg = SUGGESTIONS[si]

  return (
    <AppLayout active="dashboard" name={name}>
      <div className="page">
        <header className="dash-head">
          <div>
            <h1>Hi <span className="grad">{name}</span>.</h1>
            <div className="sub">Built around what you told me. Tap a card to dive in.</div>
          </div>
          <div className="today">{TODAY}</div>
        </header>

        <section className="dash-grid">
          <article className="card c-hero">
            <div className="row">
              <div className="copy">
                <div className="kicker">TODAY</div>
                <div className="title" style={{ opacity: suggIn ? 1 : 0 }}>{sugg.title}</div>
                <div className="lede" style={{ opacity: suggIn ? 1 : 0 }}>{sugg.lede}</div>
                <div className="actions">
                  <button className={`dash-pill primary${doneTonight ? ' done' : ''}`} onClick={handleDoTonight}>
                    <span className="lbl">{doneTonight ? 'Locked in for tonight' : "I'll do it tonight"}</span>
                    <span className="tick"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4 4L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  </button>
                  <button className="dash-pill" onClick={handleSuggestElse}>Suggest something else</button>
                </div>
              </div>
              <div className="orb" aria-hidden="true" />
            </div>
          </article>

          <article className="card c-streak">
            <div className="kicker">STREAK</div>
            <h3>Daily Check-in</h3>
            <div className="big">6</div>
            <div className="sub">Days in a row</div>
            <div className="dots" aria-hidden="true">
              {[1, 1, 1, 1, 1, 1, 0].map((on, i) => <span key={i} className={on ? 'on' : ''} />)}
            </div>
          </article>

          <article className="card c-mood">
            <div className="kicker">MOOD</div>
            <h3>This Week</h3>
            <div className="chart" aria-hidden="true">
              {moodWeek.map((h, i) => (
                <div key={i}>
                  <div className="bar"><i style={{ height: `${h}%` }} /></div>
                  <div className="lbl">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="card c-focus">
            <div className="kicker">FOCUS SCORE</div>
            <h3>Today</h3>
            <div className="focus-ring" aria-hidden="true"><div className="v">72<small>OF 100</small></div></div>
          </article>

          <article className="card c-ai">
            <div className="kicker">YOUR AI COMPANION</div>
            <h3>Versio</h3>
            <div className="msg-area" ref={msgAreaRef}>
              {messages.map((m, i) => <div key={i} className={`msg ${m.who}`}>{m.text}</div>)}
              {typing && <div className="typing"><span /><span /><span /></div>}
            </div>
            <form className="composer-mini" onSubmit={handleChatSubmit} autoComplete="off">
              <input type="text" placeholder="Reply to Versio…" value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
              <button type="submit" aria-label="Send"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            </form>
          </article>

          <article className="card c-goal">
            <div className="kicker">GOALS</div>
            <h3>This Month</h3>
            <ul>
              {goalList.slice(0, 4).map((g, i) => (
                <li key={i} className={g.done ? 'done' : ''} onClick={() => toggleGoal(i)}>
                  <span className="check"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4 4L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <span className="gt">{g.title} · {g.meta}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card c-sleep">
            <div className="kicker">SLEEP</div>
            <h3>Avg This Week</h3>
            <div className="big">6h 42m</div>
            <div className="delta neg">−24 min vs last week</div>
            <svg className="wave" viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="sg" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#4DA3FF" /><stop offset="50%" stopColor="#8A5BFF" /><stop offset="100%" stopColor="#FF3CAC" /></linearGradient></defs>
              <path d="M0,30 C20,18 40,38 60,28 S100,12 120,24 S160,40 180,22 S200,28 200,28" fill="none" stroke="url(#sg)" strokeWidth="2" />
            </svg>
          </article>

          <article className="card c-habit">
            <div className="kicker">HABITS</div>
            <h3>This Week</h3>
            <div className="rows">
              {habits.map((h, i) => (
                <div key={i} className="row">
                  <span className="name">{h.label}</span>
                  <span className="bar"><i style={{ width: `${h.pct}%` }} /></span>
                  <span className="v">{h.pct}%</span>
                </div>
              ))}
            </div>
          </article>

          <article className="card c-insight">
            <div className="kicker">PATTERN</div>
            <h3>What I Noticed</h3>
            <div className="body">Your mood lifts <em>+18%</em> on days you move before noon.</div>
          </article>
        </section>
      </div>
    </AppLayout>
  )
}
