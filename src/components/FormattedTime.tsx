"use client";

import { useEffect, useState } from "react";

export function FormattedTime({ timestamp }: { timestamp: Date }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a placeholder like <span>--:--</span>
  }

  return (
    <>
      {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </>
  );
}
