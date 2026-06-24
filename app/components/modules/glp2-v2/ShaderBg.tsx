"use client";

import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/* Animated WebGL mesh-gradient background for the hero (shadergradient.co).
 *
 * Params mirror the reference URL (sphere, slow uSpeed=0.1, soft amplitude) but
 * the colors are ours: a purple -> pink -> beige flow. Rendered client-only and
 * mounted after first paint so it never blocks hydration; the CSS --v2-gradient
 * underneath is the SSR/fallback (and what shows under prefers-reduced-motion,
 * where we skip the canvas entirely). Sits behind the hero content (z-index 0).
 */
export function ShaderBg() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Respect reduced motion — keep the static CSS gradient, skip the canvas.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Defer mount one frame so it never competes with hydration/LCP.
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="v2-shaderbg"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      <ShaderGradientCanvas
        style={{ width: "100%", height: "100%" }}
        pointerEvents="none"
      >
        <ShaderGradient
          control="props"
          type="sphere"
          // purple -> pink -> beige
          color1="#c8a6e6"
          color2="#f3a9c0"
          color3="#ecd3b6"
          // motion — kept slow (reference uSpeed 0.1)
          uSpeed={0.1}
          uStrength={0.4}
          uDensity={1.1}
          uFrequency={5.5}
          uAmplitude={1.4}
          // camera / framing from the reference
          cDistance={7.1}
          cAzimuthAngle={60}
          cPolarAngle={90}
          cameraZoom={15.3}
          positionX={0}
          positionY={-0.15}
          positionZ={0}
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          reflection={0.1}
          brightness={1.5}
          envPreset="dawn"
          lightType="3d"
          grain="off"
          enableTransition={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
