"use client";

import { useEffect, useState } from "react";

/** Ambient blob background. Disabled when reduced motion is preferred or toggled in Settings. */
export function Scene() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stored = localStorage.getItem("versio_reduce_motion") === "1";
    setReduced(mq.matches || stored);
    const onChange = () => setReduced(mq.matches || localStorage.getItem("versio_reduce_motion") === "1");
    mq.addEventListener("change", onChange);
    window.addEventListener("storage", onChange);
    window.addEventListener("versio:reduce-motion", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("storage", onChange);
      window.removeEventListener("versio:reduce-motion", onChange);
    };
  }, []);

  return <div className={`scene${reduced ? " reduced-motion" : ""}`} aria-hidden="true" />;
}
