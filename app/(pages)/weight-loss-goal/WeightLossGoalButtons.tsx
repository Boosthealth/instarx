"use client";

import { useState } from "react";
import { GOALS, buildGoalHref, trackGoalSelected } from "./goals";

export default function WeightLossGoalButtons() {
  // Read the query string synchronously on the first client render (and "" on
  // the server) rather than in a useEffect. This closes the hydration race the
  // codebase worries about (app/layout.tsx): a click that beats hydration in a
  // slow mobile webview still gets an href carrying the attribution params.
  const [search] = useState(() =>
    typeof window === "undefined" ? "" : window.location.search,
  );

  return (
    <div className="wlg-options">
      {GOALS.map((goal) => (
        <a
          key={goal.value}
          href={buildGoalHref(goal.value, search)}
          className="wlg-option"
          onClick={() => trackGoalSelected(goal.value)}
        >
          {goal.label}
        </a>
      ))}
    </div>
  );
}
