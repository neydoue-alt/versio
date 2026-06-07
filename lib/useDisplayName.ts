"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/** First name to greet the user with, sourced from their Supabase profile/auth metadata. */
export function useDisplayName(): string {
  const [name, setName] = useState("Friend");

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user || !active) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle() as { data: { full_name: string | null } | null };
      const full = profile?.full_name || (user.user_metadata?.full_name as string | undefined) || user.email || "Friend";
      const first = full.split(/\s+/)[0];
      if (active) setName(first.charAt(0).toUpperCase() + first.slice(1));
    });
    return () => { active = false; };
  }, []);

  return name;
}
