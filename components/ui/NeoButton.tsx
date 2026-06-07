import Link from "next/link";

type CommonProps = {
  primary?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function NeoButton({
  primary,
  className = "",
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`vpill${primary ? " primary" : ""} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function NeoLink({
  primary,
  className = "",
  href,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={`vpill${primary ? " primary" : ""} ${className}`}>
      {children}
    </Link>
  );
}
