"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { TOP, AREAS, BOTTOM, addIcon } from "@/lib/navConfig";
import { AddAreaModal } from "./AddAreaModal";
import type { NavItem } from "@/lib/navConfig";

function NavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`sb-link${active ? " active" : ""}`}
      style={{ "--ic": item.color } as React.CSSProperties}
    >
      <span className="ico">{item.icon}</span>
      <span className="lbl">{item.label}</span>
    </Link>
  );
}

export function Sidebar({
  activeId,
  name,
  open,
  onCloseMobile,
}: {
  activeId: string;
  name: string;
  open: boolean;
  onCloseMobile: () => void;
}) {
  const [addOpen, setAddOpen] = useState(false);
  const cap = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <aside className={`sidebar${open ? " open" : ""}`}>
        <Link href="/" className="sb-brand">
          <span className="mark">V</span>
          <span className="word">VERSIO</span>
        </Link>
        <div className="sb-scroll">
          {TOP.map((it) => (
            <NavLink key={it.id} item={it} active={it.id === activeId} onClick={onCloseMobile} />
          ))}
          <div className="sb-label">My Areas</div>
          {AREAS.map((it) => (
            <NavLink key={it.id} item={it} active={it.id === activeId} onClick={onCloseMobile} />
          ))}
          <button type="button" className="sb-add" onClick={() => setAddOpen(true)}>
            <span className="ico">{addIcon}</span>
            <span>Add area</span>
          </button>
        </div>
        <div className="sb-foot">
          {BOTTOM.map((it) => (
            <NavLink key={it.id} item={it} active={it.id === activeId} onClick={onCloseMobile} />
          ))}
          <Link href="/profile" className="sb-profile" onClick={onCloseMobile}>
            <span className="av">{cap.charAt(0)}</span>
            <span className="who">
              <span className="n">{cap}</span>
              <span className="p">View profile</span>
            </span>
          </Link>
        </div>
      </aside>
      {addOpen && <AddAreaModal onClose={() => setAddOpen(false)} />}
    </>
  );
}
