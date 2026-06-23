import Image from "next/image";

/* "As featured in" press strip. Logos are baked into the seen-on-* images
 * (OK!, BalancingAct, Woman's World, LA Weekly, Lifetime, Health). Rendered in
 * a muted/desaturated treatment so it reads as quiet credibility, not noise. */
export function FeaturedIn() {
  return (
    <section className="v2-bg-cream-2">
      <div className="v2-container py-12 text-center">
        <p
          className="mb-6 text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: "var(--v2-ink-mute)" }}
        >
          As featured in
        </p>
        <div className="flex justify-center">
          <Image
            src="/lose-weight/seen-on-desktop.webp"
            alt="As seen in: OK!, BalancingAct, Woman's World, LA Weekly, Lifetime, Health"
            width={760}
            height={48}
            sizes="(max-width: 768px) 0px, 720px"
            className="hidden w-[78%] object-contain opacity-70 sm:block"
            style={{ filter: "grayscale(1)" }}
          />
          <Image
            src="/lose-weight/seen-on-mobile.webp"
            alt="As seen in: OK!, BalancingAct, Woman's World, LA Weekly, Lifetime, Health"
            width={340}
            height={80}
            sizes="100vw"
            className="w-full object-contain opacity-70 sm:hidden"
            style={{ filter: "grayscale(1)" }}
          />
        </div>
      </div>
    </section>
  );
}
