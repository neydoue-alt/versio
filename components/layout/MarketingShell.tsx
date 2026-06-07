import Link from "next/link";

export function MarketingShell({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#000" }}>
      <div className="scene" aria-hidden="true" />
      <div className="m-halo" aria-hidden="true">
        <div className="l l1" />
        <div className="l l2" />
        <div className="l l3" />
      </div>
      <div className="m-wrap">
        <nav className="m-nav">
          <div className="m-nav-pill">
            <Link href="/" className="m-brand"><span className="dot" />VERSIO</Link>
          </div>
          <Link href="/" className="m-back">← Back home</Link>
        </nav>
        <main className="m-main">
          <div className="m-container" style={{ maxWidth: 880 }}>
            <div className="m-kicker">{kicker}</div>
            <h1 className="font-display" style={{ fontSize: "clamp(48px,7vw,96px)", textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 20px" }}>{title}</h1>
            <div className="m-glass" style={{ padding: 40, marginTop: 24 }}>
              {children}
            </div>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link href="/" className="m-nt">← Back to home</Link>
            </div>
          </div>
        </main>
        <footer className="m-footer">© 2026 VERSIO. ALL RIGHTS RESERVED.</footer>
      </div>
    </div>
  );
}
