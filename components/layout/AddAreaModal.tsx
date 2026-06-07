"use client";

import { useState } from "react";
import { ADD_AREA_OPTIONS } from "@/lib/navConfig";

export function AddAreaModal({ onClose }: { onClose: () => void }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [created, setCreated] = useState(false);

  function handleCreate() {
    if (!chosen) return;
    setCreated(true);
    setTimeout(onClose, 1500);
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 80, display: "grid", placeItems: "center",
        background: "rgba(5,3,10,0.7)", backdropFilter: "blur(8px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: "min(440px,92vw)", padding: 28, borderRadius: 22,
          background: "linear-gradient(180deg,rgba(28,18,42,0.96),rgba(12,8,20,0.96))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16),inset 0 0 0 1px rgba(255,255,255,0.08),0 40px 90px -30px rgba(0,0,0,0.9)",
        }}
      >
        {created && chosen ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: 64, height: 64, margin: "0 auto 18px", borderRadius: "50%", display: "grid", placeItems: "center",
              background: "linear-gradient(135deg,#4DA3FF,#8A5BFF 55%,#FF3CAC)", boxShadow: "0 0 40px rgba(255,60,172,0.6)",
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4 4L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="font-display" style={{ fontSize: 22, margin: "0 0 6px", textTransform: "uppercase" }}>{chosen} added</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: 0 }}>Versio is building your {chosen} page now.</p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>New area</div>
            <h3 className="font-display" style={{ fontSize: 24, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "-0.01em" }}>Add a struggle area</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: "0 0 20px" }}>Versio will build a dedicated page and start tracking it for you.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {ADD_AREA_OPTIONS.map(([name, color]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setChosen(name)}
                  style={{
                    height: 46, borderRadius: 13, border: 0, cursor: "pointer", color: "#fff", fontFamily: "inherit",
                    fontWeight: 500, fontSize: 14, textAlign: "left", padding: "0 16px",
                    background: chosen === name ? "rgba(138,91,255,0.18)" : "rgba(255,255,255,0.04)",
                    boxShadow: chosen === name ? `inset 0 0 0 1px ${color}, 0 0 22px -6px ${color}` : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                    transition: "box-shadow .2s, background .2s",
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
              <button onClick={onClose} style={{ height: 44, padding: "0 20px", borderRadius: 999, border: 0, cursor: "pointer", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 13, background: "rgba(255,255,255,0.07)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)" }}>
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!chosen}
                style={{
                  height: 44, padding: "0 22px", borderRadius: 999, border: 0, cursor: chosen ? "pointer" : "default",
                  color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 13, opacity: chosen ? 1 : 0.5,
                  background: "linear-gradient(135deg,#4DA3FF,#8A5BFF 55%,#FF3CAC)", boxShadow: "0 14px 30px -12px rgba(255,60,172,0.6)",
                }}
              >
                Create area
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
