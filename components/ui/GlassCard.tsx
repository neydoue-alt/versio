export function GlassCard({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div className={`vcard ${className}`} style={style}>
      {children}
    </div>
  );
}
