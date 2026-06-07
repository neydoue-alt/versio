"use client";

export function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      style={{
        width: 46, height: 27, borderRadius: 999, border: 0, cursor: "pointer", position: "relative", flexShrink: 0,
        background: on ? "linear-gradient(135deg,#4DA3FF,#8A5BFF 55%,#FF3CAC)" : "rgba(255,255,255,0.10)",
        boxShadow: on ? "0 0 16px -2px rgba(255,60,172,0.6), inset 0 0 0 1px rgba(255,255,255,0.18)" : "inset 0 0 0 1px rgba(255,255,255,0.10)",
        transition: "background .25s ease, box-shadow .25s ease",
      }}
    >
      <span
        style={{
          position: "absolute", top: 3, left: on ? 22 : 3, width: 21, height: 21, borderRadius: "50%",
          background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
          transition: "left .25s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </button>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 6, padding: 4, borderRadius: 999, background: "rgba(255,255,255,0.04)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)" }}>
      {options.map((opt) => {
        const on = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1, height: 38, borderRadius: 999, border: 0, cursor: "pointer", fontFamily: "inherit",
              fontSize: 13, fontWeight: 600, color: "#fff",
              background: on ? "linear-gradient(135deg,#4DA3FF,#8A5BFF 55%,#FF3CAC)" : "transparent",
              boxShadow: on ? "0 0 16px -4px rgba(255,60,172,0.6)" : "none",
              transition: "background .2s ease, box-shadow .2s ease",
            }}
            className={on ? "on" : ""}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
