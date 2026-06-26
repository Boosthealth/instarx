"use client";

import Link from "next/link";
import { useState } from "react";
import {
  GOALS,
  buildGoalHref,
  trackGoalSelected,
} from "../weight-loss-goal/goals";

export default function GoalButtons() {
  // Read the query string synchronously on the first client render (and "" on
  // the server) rather than in a useEffect, closing the hydration race so a
  // click that beats hydration still carries attribution params on the href.
  const [search] = useState(() =>
    typeof window === "undefined" ? "" : window.location.search,
  );

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      {GOALS.map((goal) => (
        <Link
          key={goal.value}
          href={buildGoalHref(goal.value, search)}
          prefetch={false}
          onClick={() => trackGoalSelected(goal.value)}
          className="flex items-center justify-center min-h-[88px] px-6 py-5 rounded-2xl bg-white/70 backdrop-blur border border-white/80 text-gray-900 text-lg sm:text-xl font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {goal.label}
        </Link>
      ))}
    </div>
  );
}
