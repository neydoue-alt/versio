/**
 * Stubbed AI reply service. Returns canned, keyword-matched responses now;
 * swap the body for a real LLM call later without touching call sites.
 */

const ACKS = [
  "Got it — that makes a lot of sense.",
  "Thanks for sharing that, it helps me understand you better.",
  "Noted. I'll keep that in mind as we go.",
  "That's really useful context — appreciate you opening up.",
  "I hear you. Let's build around that.",
  "Good to know — that'll shape what I suggest next.",
];

const CHAT_REPLIES: { keywords: string[]; replies: string[] }[] = [
  { keywords: ["sleep", "tired", "exhausted", "rest"], replies: [
    "Sleep is foundational — even 20 extra minutes tonight can shift your whole week. Want a wind-down routine?",
    "Try dimming screens an hour before bed tonight. Small change, big payoff.",
  ]},
  { keywords: ["stress", "anxious", "overwhelm", "anxiety"], replies: [
    "When it feels like a lot, naming just one thing to let go of today can help. What's one thing you could drop?",
    "Take a slow breath with me — in for 4, hold for 4, out for 6. Want to talk through what's weighing on you?",
  ]},
  { keywords: ["motivat", "lazy", "procrastinat", "stuck"], replies: [
    "Motivation follows action more often than it leads it — pick the smallest possible first step and just start there.",
    "A 10-minute starter timer works wonders. Want to set one now?",
  ]},
  { keywords: ["fitness", "workout", "gym", "exercise", "run"], replies: [
    "Movement compounds — even a short walk counts toward momentum. What feels doable today?",
    "Lay your kit out tonight so tomorrow's version of you has one less excuse.",
  ]},
  { keywords: ["mood", "sad", "down", "low", "rough"], replies: [
    "Thanks for telling me. Rough days are data, not verdicts — what's one small thing that might help right now?",
    "That sounds heavy. You don't have to fix everything today — just the next small thing.",
  ]},
  { keywords: ["goal", "goals", "progress"], replies: [
    "You're 71% on follow-through this month — that's real progress. Want to look at what's working?",
    "Let's check your goals together — which one feels most alive for you right now?",
  ]},
  { keywords: ["yes", "yeah", "sure", "ok", "okay"], replies: [
    "Love that — let's go.",
    "Great — I'll fold that into your plan.",
  ]},
  { keywords: ["no", "nah", "not really"], replies: [
    "All good — no pressure. I'm here whenever you want to revisit it.",
    "Totally fine. We can come back to it another time.",
  ]},
  { keywords: ["thanks", "thank you", "appreciate"], replies: [
    "Anytime. That's what I'm here for.",
    "Of course — proud of you for showing up today.",
  ]},
  { keywords: ["hi", "hey", "hello"], replies: [
    "Hey! Good to see you. How's your day going so far?",
    "Hi there — what's on your mind today?",
  ]},
];

const FALLBACK = [
  "Tell me more about that — I'm listening.",
  "I want to understand better — can you say a bit more?",
  "That's worth digging into. What makes you say that?",
];

function pick(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export async function aiAck(): Promise<string> {
  // Real implementation would call an LLM here with a short timeout + canned fallback.
  return pick(ACKS);
}

export async function aiReply(message: string): Promise<string> {
  const lower = message.toLowerCase();
  for (const group of CHAT_REPLIES) {
    if (group.keywords.some((k) => lower.includes(k))) return pick(group.replies);
  }
  return pick(FALLBACK);
}
