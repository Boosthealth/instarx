import Image from "next/image";
import Link from "next/link";
import { ArtDirected } from "./ArtDirected";
import {
  compare,
  engineered,
  faq,
  finalCta,
  footerDisclaimers,
  formula,
  hero,
  ready,
  safetyStrip,
  steps,
  testimonials,
  trust,
  why,
} from "./content";
import { CheckIcon, Cta, Reveal } from "./ui";

export function Hero() {
  return (
    <section className="edv3-hero" aria-labelledby="edv3-hero-title">
      <ArtDirected
        className="edv3-hero__media"
        wide={hero.image.wide}
        tall={hero.image.tall}
        alt={hero.image.alt}
        priority
      />
      <div className="edv3-hero__scrim" aria-hidden="true" />
      <div className="edv3-container edv3-hero__inner">
        <div className="edv3-hero__copy">
          <p
            className="edv3-rating edv3-hero__in"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <Stars />
            <span>
              <strong>{hero.rating.score}</strong> {hero.rating.label}
            </span>
          </p>
          <p
            className="edv3-kicker edv3-hero__in"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {hero.kicker}
          </p>
          <h1 id="edv3-hero-title" className="edv3-hero__title">
            {hero.headline.map(([lead, accent], i) => (
              <span
                key={accent}
                className="edv3-hero__line edv3-hero__in"
                style={{ "--i": i + 2 } as React.CSSProperties}
              >
                {lead} <em>{accent}</em>
              </span>
            ))}
          </h1>
          <p
            className="edv3-hero__body edv3-hero__in"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            {hero.body}
          </p>
          <ul
            className="edv3-chips edv3-hero__in"
            style={{ "--i": 6 } as React.CSSProperties}
            aria-label="At a glance"
          >
            {hero.chips.map((chip) => (
              <li key={chip}>
                <CheckIcon />
                {chip}
              </li>
            ))}
          </ul>
          <div
            className="edv3-hero__actions edv3-hero__in"
            style={{ "--i": 7 } as React.CSSProperties}
          >
            <Cta>{hero.cta}</Cta>
            <p className="edv3-micro">{hero.micro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <span className="edv3-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 16 16" width="14" height="14">
          <path
            d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.5l-4.2 2.3 1-4.6L1.3 6l4.7-.5z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}

export function TrustBar() {
  return (
    <section className="edv3-trust" aria-label="Why InstaRx">
      <ul className="edv3-container edv3-trust__list">
        {trust.map((item) => (
          <li key={item}>
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Ready() {
  return (
    <section
      className="edv3-section edv3-ready"
      aria-labelledby="edv3-ready-title"
    >
      <div className="edv3-container edv3-ready__grid">
        <div className="edv3-ready__copy">
          <Reveal>
            <h2 id="edv3-ready-title" className="edv3-h2">
              {ready.heading}
            </h2>
            <p className="edv3-lede">{ready.body}</p>
          </Reveal>
          <ul className="edv3-points">
            {ready.points.map((point) => (
              <Reveal as="li" key={point.lead}>
                <CheckIcon />
                <p>
                  <strong>{point.lead}</strong> {point.text}
                </p>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <Cta>{ready.cta}</Cta>
          </Reveal>
        </div>
        <Reveal as="figure" className="edv3-ready__media">
          <Image
            src={ready.image.src}
            alt={ready.image.alt}
            width={1600}
            height={2000}
            sizes="(min-width: 64rem) 40vw, 92vw"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="edv3-section edv3-why" aria-labelledby="edv3-why-title">
      <Reveal className="edv3-container edv3-why__inner">
        <h2 id="edv3-why-title" className="edv3-why__title">
          {why.heading}
        </h2>
        <p className="edv3-why__body">{why.body}</p>
      </Reveal>
    </section>
  );
}

export function Formula() {
  return (
    <section
      id="formula"
      className="edv3-section edv3-formula"
      aria-labelledby="edv3-formula-title"
    >
      <div className="edv3-container">
        <Reveal className="edv3-section__head">
          <h2 id="edv3-formula-title" className="edv3-h2">
            {formula.heading}
          </h2>
          <p className="edv3-section__sub">{formula.sub}</p>
        </Reveal>
      </div>
      <ul
        className="edv3-formula__rail"
        tabIndex={0}
        aria-label="The four ingredients"
      >
        {formula.items.map((item) => (
          <li key={item.key} className="edv3-ingredient">
            <div className="edv3-ingredient__media">
              <Image
                src={item.image}
                alt={item.alt}
                width={1600}
                height={2000}
                sizes="(min-width: 64rem) 23vw, (min-width: 40rem) 45vw, 80vw"
              />
              <span className="edv3-ingredient__role">{item.role}</span>
              <h3 className="edv3-ingredient__name">{item.ingredient}</h3>
            </div>
            <p className="edv3-ingredient__text">{item.text}</p>
            <dl className="edv3-ingredient__meta">
              <div>
                <dt className="edv3-sr">Strength</dt>
                <dd>{formula.strength}</dd>
              </div>
              <div>
                <dt className="edv3-sr">Approval status</dt>
                <dd>{item.approval}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <div className="edv3-container">
        <p className="edv3-fineprint edv3-formula__foot">{formula.footer}</p>
      </div>
    </section>
  );
}

export function Engineered() {
  return (
    <section
      className="edv3-section edv3-engineered"
      aria-labelledby="edv3-eng-title"
    >
      <div className="edv3-container edv3-engineered__grid">
        <Reveal className="edv3-engineered__head">
          <h2 id="edv3-eng-title" className="edv3-h2">
            {engineered.heading}
          </h2>
        </Reveal>
        <ol className="edv3-engineered__list">
          {engineered.items.map((item) => (
            <Reveal as="li" key={item.title}>
              <h3 className="edv3-h3">{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Compare() {
  return (
    <section
      className="edv3-section edv3-compare"
      aria-labelledby="edv3-compare-title"
    >
      <div className="edv3-container">
        <Reveal className="edv3-section__head">
          <h2 id="edv3-compare-title" className="edv3-h2">
            {compare.heading}
          </h2>
        </Reveal>
        <Reveal className="edv3-compare__wrap">
          {/* Explicit roles: the phone layout re-displays rows as grids, which
              would otherwise drop table semantics in some browsers. */}
          <table className="edv3-table" role="table">
            <caption className="edv3-sr">
              Insta-Ready compared with a traditional ED pill
            </caption>
            <thead role="rowgroup">
              <tr role="row">
                <td role="cell" />
                <th
                  scope="col"
                  role="columnheader"
                  className="edv3-table__ours"
                >
                  {compare.columns[0]}
                </th>
                <th scope="col" role="columnheader">
                  {compare.columns[1]}
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {compare.rows.map(([label, ours, theirs]) => (
                <tr key={label} role="row">
                  <th scope="row" role="rowheader">
                    {label}
                  </th>
                  <td role="cell" className="edv3-table__ours">
                    {ours}
                  </td>
                  <td role="cell">{theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <div className="edv3-center">
          <Cta>{compare.cta}</Cta>
        </div>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <section className="edv3-steps" aria-labelledby="edv3-steps-title">
      <ArtDirected
        className="edv3-steps__media"
        wide={steps.image.wide}
        tall={steps.image.tall}
        alt={steps.image.alt}
      />
      <div className="edv3-steps__scrim" aria-hidden="true" />
      <div className="edv3-container edv3-steps__inner">
        <Reveal>
          <h2 id="edv3-steps-title" className="edv3-h2">
            {steps.heading}
          </h2>
        </Reveal>
        <ol className="edv3-steps__list">
          {steps.items.map((item, i) => (
            <Reveal as="li" key={item.title}>
              <span className="edv3-steps__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="edv3-h3">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <Cta>{steps.cta}</Cta>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  /* Sample quotes are not real customers; production shows the real reviews. */
  const set =
    process.env.VERCEL_ENV === "production"
      ? testimonials.real
      : testimonials.sample;
  return (
    <section
      className="edv3-section edv3-testimonials"
      aria-labelledby="edv3-testimonials-title"
    >
      <div className="edv3-container">
        <Reveal className="edv3-section__head">
          <p className="edv3-rating">
            <Stars />
            <span>{testimonials.rating}</span>
          </p>
          <h2 id="edv3-testimonials-title" className="edv3-h2">
            {testimonials.heading}
          </h2>
          <p className="edv3-section__sub">{set.note}</p>
        </Reveal>
        <ul className="edv3-quotes" data-count={set.items.length}>
          {set.items.map((item) => (
            <Reveal as="li" key={item.name}>
              <figure>
                <blockquote>
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
                <figcaption>
                  <span className="edv3-quotes__name">{item.name}</span>
                  <span className="edv3-quotes__meta">{item.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <p className="edv3-fineprint edv3-center">{testimonials.disclaimer}</p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="edv3-section edv3-faq" aria-labelledby="edv3-faq-title">
      <div className="edv3-container edv3-faq__grid">
        <Reveal className="edv3-faq__head">
          <h2 id="edv3-faq-title" className="edv3-h2">
            {faq.heading}
          </h2>
        </Reveal>
        <div className="edv3-faq__list">
          {faq.items.map((item) => (
            <details key={item.q} className="edv3-faq__item">
              <summary>
                <span>{item.q}</span>
                <span className="edv3-faq__icon" aria-hidden="true" />
              </summary>
              <div className="edv3-faq__answer">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="edv3-final" aria-labelledby="edv3-final-title">
      {/* One portrait frame: full-bleed on phones, a masked panel on the
       * right from 48rem so the copy never sits on a face. */}
      <div className="edv3-final__media">
        <Image
          src={finalCta.image.src}
          alt={finalCta.image.alt}
          fill
          sizes="(min-width: 48rem) 50vw, 100vw"
          quality={80}
        />
      </div>
      <div className="edv3-final__scrim" aria-hidden="true" />
      <div className="edv3-container edv3-final__inner">
        <Reveal>
          <h2 id="edv3-final-title" className="edv3-final__title">
            {finalCta.heading}
          </h2>
          <p className="edv3-lede">{finalCta.body}</p>
          <div className="edv3-final__actions">
            <Cta>{finalCta.cta}</Cta>
            <p className="edv3-micro">{finalCta.micro}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SafetyAndDisclaimers() {
  return (
    <section className="edv3-disclaimers" aria-label="Safety and disclaimers">
      <div className="edv3-container edv3-disclaimers__inner">
        <p className="edv3-disclaimers__safety">{safetyStrip}</p>
        <p>{footerDisclaimers.footnote}</p>
        {footerDisclaimers.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
        <p>
          {footerDisclaimers.trademarks}{" "}
          <Link href={footerDisclaimers.safety.href} className="edv3-link">
            {footerDisclaimers.safety.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
