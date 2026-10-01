"use client";

import { useEffect, useState } from "react";

const BIRTH_DATE = new Date("2005-11-02T00:00:00");

function calculateAge() {
  const now = new Date();
  const diff = now.getTime() - BIRTH_DATE.getTime();
  const years = diff / (365.25 * 24 * 60 * 60 * 1000);
  return years;
}

export default function OnEarthSection() {
  const [age, setAge] = useState(0);

  useEffect(() => {
    setAge(calculateAge());
    const interval = setInterval(() => {
      setAge(calculateAge());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
        On Earth for
      </p>
      <p className="text-4xl font-bold tabular-nums tracking-tight">
        {age.toFixed(9)}
        <span className="text-base font-normal ml-1 text-stone-500 dark:text-stone-400">
          years
        </span>
      </p>
    </div>
  );
}
