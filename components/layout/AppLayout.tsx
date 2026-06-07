"use client";

import Link from "next/link";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Scene } from "./Scene";

export function AppLayout({
  active,
  name,
  children,
}: {
  active: string;
  name: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Scene />
      <div className="app">
        <Sidebar activeId={active} name={name} open={open} onCloseMobile={() => setOpen(false)} />
        {open && <div className={`sb-backdrop${open ? " show" : ""}`} onClick={() => setOpen(false)} />}
        <div className="app-main">
          <div className="app-topbar">
            <button className="sb-toggle" aria-label="Menu" onClick={() => setOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <Link className="brand" href="/"><span className="dot"></span>VERSIO</Link>
            <span style={{ width: 42 }}></span>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
