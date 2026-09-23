import { Reveal } from "./Reveal";
import { FaqGroup } from "./FaqGroup";
import { faq, faqGroups } from "./content";

/* 5.13 grouped accordion + FAQPage JSON-LD built from the same content. */
export function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    ),
  };

  return (
    <section id="faq" className="ed-section" aria-labelledby="ed-faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="ed-wrap ed-faq">
        <Reveal>
          <h2 id="ed-faq" className="ed-h2">
            {faq.headline}
          </h2>
        </Reveal>
        <div>
          {faqGroups.map((g, i) => (
            <FaqGroup key={g.group} idPrefix={`faq-${i}`} {...g} />
          ))}
        </div>
      </div>
    </section>
  );
}
