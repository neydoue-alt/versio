export type NavItem = {
  id: string;
  label: string;
  href: string;
  color: string;
  icon: React.ReactNode;
};

const ico = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.7"/><rect x="14" y="3" width="7" height="5" rx="1.6" stroke="currentColor" strokeWidth="1.7"/><rect x="14" y="12" width="7" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.7"/><rect x="3" y="16" width="7" height="5" rx="1.6" stroke="currentColor" strokeWidth="1.7"/></svg>
  ),
  progress: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M4 15l5-5 4 4 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 6h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  checkin: (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  goals: (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>
  ),
  sleep: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
  ),
  discipline: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M13 2 4 13h6l-1 9 9-11h-6l1-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  fitness: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M3 12h3l2-5 4 14 3-9 2 3h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  pricing: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M3.5 12.5 11 5h8v8l-7.5 7.5a2 2 0 0 1-2.8 0l-4.2-4.2a2 2 0 0 1 0-2.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="15.5" cy="8.5" r="1.3" fill="currentColor"/></svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7"/><path d="M19.4 13a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V20a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 4.6 13H4.5a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V2a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.1a2 2 0 1 1 0 4h-.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8.5" r="3.8" stroke="currentColor" strokeWidth="1.7"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
  ),
  add: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
};

export const TOP: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: ico.dashboard, color: "#C9B3FF" },
  { id: "progress", label: "Progress Journey", href: "/progress", icon: ico.progress, color: "#4DA3FF" },
  { id: "checkin", label: "Daily Check-in", href: "/checkin", icon: ico.checkin, color: "#36E0A0" },
  { id: "goals", label: "Goals", href: "/goals", icon: ico.goals, color: "#FFB24D" },
];

export const AREAS: NavItem[] = [
  { id: "sleep", label: "Sleep", href: "/sleep", icon: ico.sleep, color: "#4DA3FF" },
  { id: "discipline", label: "Discipline", href: "/discipline", icon: ico.discipline, color: "#FF3CAC" },
  { id: "fitness", label: "Fitness", href: "/fitness", icon: ico.fitness, color: "#36E0A0" },
];

export const BOTTOM: NavItem[] = [
  { id: "pricing", label: "Pricing", href: "/pricing", icon: ico.pricing, color: "#FFB24D" },
  { id: "settings", label: "Settings", href: "/settings", icon: ico.settings, color: "#C9B3FF" },
];

export const ADD_AREA_OPTIONS: [string, string][] = [
  ["Focus", "#8A5BFF"],
  ["Nutrition", "#36E0A0"],
  ["Money", "#FFB24D"],
  ["Relationships", "#FF3CAC"],
  ["Mindfulness", "#4DA3FF"],
  ["Creativity", "#C9B3FF"],
];

export const profileIcon = ico.profile;
export const addIcon = ico.add;
