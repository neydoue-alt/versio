'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { aiAck } from '@/lib/aiReply'

type CharState = null | 'thinking' | 'speaking'

const QUESTIONS = (name: string) => [
  { lead: `Hey ${name} — I'm Versio.`, accent: `What's been holding you back lately?` },
  { lead: `Thanks for trusting me with that.`, accent: `If we could fix just one thing this month, what would it be?` },
  { lead: `Got it.`, accent: `What does a genuinely good day look like for you right now?` },
  { lead: `That helps.`, accent: `What have you already tried — and where did it fall apart?` },
  { lead: `Last one.`, accent: `A month from now, how will you know Versio is working?` },
]

const BUILD_STEPS = [
  'Reading what you shared…',
  'Mapping your struggle areas…',
  'Choosing your daily check-ins…',
  'Wiring habits, mood, sleep & focus…',
  'Calibrating your AI companion…',
  'Almost there…',
]

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function OnboardingInner() {
  const router = useRouter()
  const params = useSearchParams()
  const rawName = params.get('name') || 'there'
  const userName = (() => {
    const first = rawName.split(/\s+/)[0]
    return first.charAt(0).toUpperCase() + first.slice(1)
  })()

  const [greetingHTML, setGreetingHTML] = useState<string>('…')
  const [greetingIn, setGreetingIn] = useState(false)
  const [charState, setCharState] = useState<CharState>(null)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState<boolean[]>([false, false, false, false, false])
  const [inputValue, setInputValue] = useState('')
  const [inputDisabled, setInputDisabled] = useState(true)
  const [echo, setEcho] = useState('')
  const [echoShow, setEchoShow] = useState(false)
  const [building, setBuilding] = useState(false)
  const [buildPct, setBuildPct] = useState(4)
  const [buildSub, setBuildSub] = useState('Listening…')
  const waitingRef = useRef(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const startedRef = useRef(false);

  const questions = QUESTIONS(userName)

  async function swapGreeting(html: string) {
    setGreetingIn(false)
    await wait(520)
    setGreetingHTML(html)
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null))))
    setGreetingIn(true)
    await wait(760)
  }

  async function showTyping() {
    await swapGreeting(`<span class="ob-typing"><span></span><span></span><span></span></span>`)
  }

  function questionHTML(q: { lead: string; accent: string }) {
    return `${q.lead} <span class="accent">${q.accent}</span>`
  }

  async function askQuestion(idx: number) {
    setCharState('speaking')
    await showTyping()
    await wait(700 + Math.random() * 450)
    await swapGreeting(questionHTML(questions[idx]))
    await wait(250)
    setCharState(null)
    waitingRef.current = false
    setInputDisabled(false)
    textareaRef.current?.focus()
  }

  function startBuilding() {
    setBuilding(true)
    let i = 0
    let pct = 4
    setBuildPct(pct)
    const tick = () => {
      if (i < BUILD_STEPS.length) {
        setBuildSub(BUILD_STEPS[i])
        pct = Math.min(100, pct + Math.round(96 / BUILD_STEPS.length))
        setBuildPct(pct)
        i++
        setTimeout(tick, 900)
      } else {
        setBuildPct(100)
        setBuildSub('Ready.')
        try { localStorage.setItem('versio_onboarded', '1') } catch {}
        setTimeout(() => router.push(`/dashboard?name=${encodeURIComponent(userName)}`), 700)
      }
    }
    tick()
  }

  async function onUserAnswer(text: string) {
    setEcho(`"${text}"`)
    setEchoShow(true)
    const justAnswered = step
    setDone((d) => { const n = [...d]; n[justAnswered] = true; return n })
    setStep(justAnswered + 1)
    setInputDisabled(true)

    setCharState('thinking')
    await showTyping()
    const ack = await aiAck()

    setCharState('speaking')
    await swapGreeting(`<span class="accent">${ack}</span>`)
    await wait(3800)
    setEchoShow(false)

    if (justAnswered + 1 < questions.length) {
      await askQuestion(justAnswered + 1)
    } else {
      setCharState('speaking')
      await showTyping()
      await wait(800)
      await swapGreeting(`Thanks ${userName}. <span class="accent">I have what I need — building your dashboard now.</span>`)
      await wait(1800)
      startBuilding()
    }
  }

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    ;(async () => {
      setInputDisabled(true)
      setCharState('speaking')
      await showTyping()
      await wait(1000)
      await askQuestion(0)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function autoresize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(120, el.scrollHeight) + 'px'
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (waitingRef.current) return
    const text = inputValue.trim()
    if (!text) return
    waitingRef.current = true
    setInputValue('')
    requestAnimationFrame(autoresize)
    await onUserAnswer(text)
  }

  return (
    <div className="ob-body">
      <div className="ob-scene" aria-hidden="true" />
      <div className="ob-wrap">
        <nav style={{ padding: '22px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="m-nav-pill"><Link href="/" className="m-brand"><span className="dot" />VERSIO</Link></div>
          <div className="ob-step">
            <span>Getting to know you</span>
            <div className="progress">
              {done.map((d, i) => <span key={i} className={d ? 'done' : ''} />)}
            </div>
          </div>
        </nav>

        <main className="ob-main">
          <div className="ob-greeting-wrap">
            <h1 className={`ob-greeting${greetingIn ? ' in' : ''}`} dangerouslySetInnerHTML={{ __html: greetingHTML }} />
          </div>

          <div className={`ob-character${charState ? ` ${charState}` : ''}`} aria-hidden="true">
            <span className="ob-spark s1" /><span className="ob-spark s2" /><span className="ob-spark s3" />
            <div className="ob-blob" />
            <div className="ob-eyes"><span className="ob-eye" /><span className="ob-eye" /></div>
            <div className="ob-shadow" />
          </div>

          <div className="ob-answer-zone">
            <form className="ob-composer" onSubmit={handleSubmit} autoComplete="off">
              <textarea
                ref={textareaRef}
                placeholder="Type your answer…"
                rows={1}
                required
                disabled={inputDisabled}
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); autoresize() }}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); (e.currentTarget.form as HTMLFormElement)?.requestSubmit() } }}
              />
              <button type="submit" className="ob-send" aria-label="Send" disabled={inputDisabled}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <div className="ob-hint"><b>Enter</b> to send · <b>Shift + Enter</b> for a new line</div>
            <div className={`ob-echo${echoShow ? ' show' : ''}`}>{echo}</div>
          </div>
        </main>

        <footer className="ob-footer">YOUR ANSWERS STAY YOURS · VERSIO USES THEM ONLY TO BUILD YOUR DASHBOARD</footer>
      </div>

      <div className={`ob-building${building ? ' show' : ''}`} aria-live="polite">
        <div className="ob-bchar ob-character">
          <div className="ob-blob" />
          <div className="ob-eyes"><span className="ob-eye" /><span className="ob-eye" /></div>
        </div>
        <h2>BUILDING<br/>YOUR VERSIO</h2>
        <div className="bar"><i style={{ width: `${buildPct}%` }} /></div>
        <div className="substep">{buildSub}</div>
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingInner />
    </Suspense>
  )
}
