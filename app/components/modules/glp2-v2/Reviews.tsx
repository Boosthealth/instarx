import { Reveal } from "./Reveal";
import { Stars } from "./ui";
import { reviews } from "./content";

export function Reviews() {
  return (
    <section id="reviews" className="v2-section v2-bg-blush">
      <div className="v2-container">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="v2-eyebrow mb-5 inline-flex justify-center">
            In their words
          </p>
          <h2 className="v2-h2 mb-5">
            Real people who reclaimed their{" "}
            <span className="v2-accent">health</span>.
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-semibold" style={{ color: "var(--v2-ink)" }}>
              Excellent 4.7
            </span>
            <Stars count={5} size={15} />
            <span className="text-sm" style={{ color: "var(--v2-ink-mute)" }}>
              · 10,000+ happy customers
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reviews.map((review, i) => (
            <Reveal as="article" key={review.name} delay={(i % 2) * 80}>
              <figure className="v2-card flex h-full flex-col p-7">
                <Stars count={5} size={15} className="mb-4" />
                <blockquote
                  className="mb-5 flex-1"
                  style={{
                    fontFamily: "var(--v2-fh)",
                    fontSize: "1.22rem",
                    lineHeight: 1.45,
                    color: "var(--v2-ink)",
                  }}
                >
                  “{review.quote}”
                </blockquote>
                <figcaption>
                  <span className="font-semibold" style={{ color: "var(--v2-ink)" }}>
                    {review.name}
                  </span>
                  <span style={{ color: "var(--v2-rose-deep)" }}> — {review.tag}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
