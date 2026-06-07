// Static sample data matching the design reference's charts/stats.
// Replace with real Supabase queries as those tables get wired up.

export const moodWeek = [60, 80, 55, 90, 70, 40, 75]; // % bar heights, Mon–Sun

export const SUGGESTIONS = [
  { title: "Wind down 30 minutes earlier tonight.", lede: "Your mood lifts most on nights you're in bed before 11 — let's protect that window." },
  { title: "Take a 10-minute walk after lunch.", lede: "Midday movement is the single biggest mood lever we've seen in your data this month." },
  { title: "Write down tomorrow's first task tonight.", lede: "Deciding ahead of time removes the friction that usually stalls your mornings." },
  { title: "Put your phone in another room at 9pm.", lede: "Your best sleep nights all start with a screen-free hour beforehand." },
  { title: "Do a 5-minute breathing reset before your next meeting.", lede: "Stress dips noticeably on days you pause before high-pressure moments." },
  { title: "Text one person you've been meaning to reach.", lede: "Your mood scores climb on days with even brief social connection." },
];

export type Goal = { title: string; meta: string; progress: number; done: boolean };

export const goals: Goal[] = [
  { title: "7 hours sleep", meta: "5 of 7 nights this week", progress: 71, done: false },
  { title: "Workout 3× a week", meta: "3 of 3 done — nailed it", progress: 100, done: true },
  { title: "No phone before 9am", meta: "5 of 7 mornings", progress: 71, done: true },
  { title: "Journal 10 min daily", meta: "3 of 7 days", progress: 42, done: false },
  { title: "Read 20 min before bed", meta: "4 of 7 nights", progress: 57, done: false },
  { title: "Meditate 5 min", meta: "6 of 7 days", progress: 85, done: false },
];

export const habits = [
  { label: "Morning routine", pct: 80 },
  { label: "Hydration", pct: 64 },
  { label: "Movement", pct: 55 },
  { label: "Wind-down", pct: 38 },
];

export const progressStats = [
  { n: "47", l: "Days active", d: "+6" },
  { n: "12", l: "Day streak", d: "+3" },
  { n: "38", l: "Check-ins", d: "+9" },
  { n: "+0.6", l: "Mood delta", d: "" },
];

export const milestones = [
  { title: "First check-in logged", meta: "Day 1 — you showed up." },
  { title: "5-day streak reached", meta: "Consistency starting to compound." },
  { title: "First goal completed", meta: "Workout 3× a week — done." },
  { title: "Mood trending up", meta: "+0.6 average over the last 2 weeks." },
];

type AreaTheme = {
  accent: string;
  accentDark: string;
  headline: string;
  body: string;
  stats: { n: string; l: string; d?: string }[];
  bars: number[];
  chartLabel: string;
  tips: string[];
};

export const areaThemes: Record<"sleep" | "discipline" | "fitness", AreaTheme> = {
  sleep: {
    accent: "#4DA3FF",
    accentDark: "#1A4EA8",
    headline: "You're most consistent when you're in bed before 11 — let's protect that window.",
    body: "Your sleep score climbs on nights you wind down screen-free. Three early nights this week moved the needle more than anything else we tracked.",
    stats: [
      { n: "6.8h", l: "Avg sleep", d: "+0.4h" },
      { n: "5", l: "Night streak" },
      { n: "71%", l: "On-time nights", d: "+12%" },
      { n: "1", l: "Late night" },
    ],
    bars: [70, 55, 80, 65, 90, 50, 75],
    chartLabel: "HOURS SLEPT",
    tips: [
      "Dim screens an hour before bed — even warm lighting helps your body wind down.",
      "Keep a consistent wake time, even on weekends — it anchors your whole rhythm.",
      "If you're not asleep in 20 minutes, get up and do something calm, then return.",
    ],
  },
  discipline: {
    accent: "#FF3CAC",
    accentDark: "#C81E7E",
    headline: "Discipline is highest in your first 3 hours awake — protect them.",
    body: "When you start the day with one small win, you follow through 2× more often. Mornings are your superpower; let's defend them.",
    stats: [
      { n: "71%", l: "Follow-through", d: "+9%" },
      { n: "5", l: "Day streak" },
      { n: "18", l: "Tasks done", d: "+4" },
      { n: "2", l: "Slips" },
    ],
    bars: [60, 80, 55, 90, 70, 40, 75],
    chartLabel: "TASKS COMPLETED",
    tips: [
      "Pick tomorrow's first task tonight — decision fatigue is the enemy.",
      "Use a 10-minute starter to beat procrastination, then reassess.",
      "Stack a new habit onto something you already do every morning.",
    ],
  },
  fitness: {
    accent: "#36E0A0",
    accentDark: "#1FA875",
    headline: "Move before noon — your mood lifts 18% on those days.",
    body: "You hit 3 workouts this week — a personal best. Morning movement is doing more for your mood than anything else we track.",
    stats: [
      { n: "3", l: "Workouts", d: "+1" },
      { n: "4.2k", l: "Avg steps" },
      { n: "184", l: "Active min", d: "+22m" },
      { n: "2", l: "Rest days" },
    ],
    bars: [40, 75, 20, 85, 60, 30, 70],
    chartLabel: "ACTIVE MINUTES",
    tips: [
      "Lay your kit out tonight — friction is what skips workouts.",
      "A 10-minute walk counts. Consistency beats intensity right now.",
      "Pair movement with daylight in the morning for a double mood hit.",
    ],
  },
};

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "/ forever",
    tag: "Current",
    features: ["Daily check-ins", "Basic goal tracking", "1 struggle area", "Weekly summary"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9",
    cadence: "/ month",
    tag: "Most popular",
    highlight: true,
    features: ["Everything in Free", "Unlimited struggle areas", "AI companion chat", "Progress journey + milestones", "Priority insights"],
  },
  {
    id: "elite",
    name: "Elite",
    price: "$19",
    cadence: "/ month",
    tag: "For the committed",
    features: ["Everything in Pro", "Weekly AI strategy session", "Custom plans", "Early access to new areas"],
  },
];
