"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Check, ChevronLeft, CircleCheck } from "lucide-react";
import { EdButton, SafetyStrip } from "./ui";
import {
  INTAKE_HREF,
  ladder,
  qualifier,
  recommend,
  trustChips,
  type Goal,
  type LadderId,
  type Timing,
} from "./content";

/* 5.2 qualifier: three preference questions answered with buttons (not a
 * form), then the 5.7 ladder with the matching card marked. Nothing is stored
 * and no answer text leaves the page; the only signal is a property-less
 * `qualifier_completed` PostHog event.
 *
 * Motion lives in CSS: all steps share one grid cell (stable height) and each
 * step's `data-pos` (before/current/after) gives direction-aware slides. The
 * "#formulas" hash (nav link) opens the ladder in browse mode. */

type Answers = { goal?: Goal; timing?: Timing; online?: string };
type Mode = "quiz" | "result" | "browse";

const STEPS = qualifier.steps;
const ADVANCE_MS = 150; // let the amber selected state register before sliding

export function Qualifier() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [mode, setMode] = useState<Mode>("quiz");
  const pending = useRef(false);
  const focusNext = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const resultTitleRef = useRef<HTMLHeadingElement>(null);

  // Move focus only after a user action, never on first render.
  useEffect(() => {
    if (!focusNext.current) return;
    focusNext.current = false;
    if (mode === "quiz") questionRefs.current[step]?.focus();
    else resultTitleRef.current?.focus();
  }, [step, mode]);

  // Nav "Formulas" → browse the whole ladder without a recommendation.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#formulas") setMode("browse");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const choose = useCallback(
    (index: number, value: string) => {
      if (pending.current) return;
      const key = STEPS[index].key as keyof Answers;
      setAnswers((a) => ({ ...a, [key]: value }));
      pending.current = true;
      window.setTimeout(
        () => {
          pending.current = false;
          focusNext.current = true;
          if (index < STEPS.length - 1) {
            setStep(index + 1);
          } else {
            setMode("result");
            window.posthog?.capture?.("qualifier_completed");
          }
        },
        reducedMotion() ? 0 : ADVANCE_MS,
      );
    },
    [setAnswers],
  );

  const back = () => {
    focusNext.current = true;
    if (mode !== "quiz") {
      setMode("quiz");
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const restart = () => {
    focusNext.current = true;
    setAnswers({});
    setStep(0);
    setMode("quiz");
    if (window.location.hash === "#formulas") {
      history.replaceState(null, "", window.location.pathname);
    }
    rootRef.current?.scrollIntoView({
      block: "nearest",
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  };

  const done = mode === "result";
  const rec: LadderId | null =
    done && answers.goal && answers.timing
      ? recommend(answers.goal, answers.timing)
      : null;

  return (
    <div
      id="formulas"
      ref={rootRef}
      className="ed-q"
      role="group"
      aria-label={qualifier.label}
    >
      <div className="ed-q__bar">
        <span className="ed-q__label">
          {mode === "quiz"
            ? qualifier.stepLabel(step + 1, STEPS.length)
            : qualifier.label}
        </span>
        <button
          type="button"
          className="ed-q__back"
          onClick={back}
          hidden={mode === "quiz" && step === 0}
        >
          <ChevronLeft size={16} aria-hidden="true" />
          {qualifier.back}
        </button>
      </div>

      {mode !== "browse" && (
        <ol className="ed-q__steps" aria-hidden="true">
          {STEPS.map((s, i) => {
            const state =
              done || i < step ? "done" : i === step ? "current" : "todo";
            return (
              <li key={s.key} className="ed-q__seg" data-state={state}>
                <span>{i + 1}</span>
                <span className="ed-q__track">
                  <span className="ed-q__fill" />
                </span>
              </li>
            );
          })}
        </ol>
      )}

      {mode === "quiz" ? (
        <div className="ed-q__stage">
          {STEPS.map((s, i) => {
            const pos = i < step ? "before" : i === step ? "current" : "after";
            const selected = answers[s.key as keyof Answers];
            const active = pos === "current";
            return (
              <div
                key={s.key}
                className="ed-q__step"
                data-pos={pos}
                aria-hidden={!active}
                inert={!active}
              >
                <h2
                  className="ed-q__question"
                  tabIndex={-1}
                  ref={(el) => {
                    questionRefs.current[i] = el;
                  }}
                >
                  {s.question}
                </h2>
                <ul className="ed-q__answers" data-count={s.answers.length}>
                  {s.answers.map((a) => (
                    <li key={a.value}>
                      <button
                        type="button"
                        className="ed-q__answer"
                        aria-pressed={selected === a.value}
                        onClick={() => choose(i, a.value)}
                      >
                        {a.label}
                        <span className="ed-q__tick" aria-hidden="true">
                          <Check size={14} strokeWidth={3} />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="ed-q__skip-slot">
                  {i === 0 && (
                    <a className="ed-q__skip" href={INTAKE_HREF}>
                      {qualifier.skip}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Result
          rec={rec}
          showAddon={done && answers.goal === "desire"}
          titleRef={resultTitleRef}
          onRestart={restart}
        />
      )}
    </div>
  );
}

function Result({
  rec,
  showAddon,
  titleRef,
  onRestart,
}: {
  rec: LadderId | null;
  showAddon: boolean;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
}) {
  const r = qualifier.result;
  // Recommended card leads (it's the answer); the rest keep ladder order.
  // "Desire" answers pull the Plus add-on up behind it.
  const ordered = [...ladder].sort((a, b) => {
    const rank = (id: LadderId) =>
      id === rec ? 0 : showAddon && id === "plus" ? 1 : 2;
    return rank(a.id) - rank(b.id);
  });

  return (
    <div className="ed-result">
      <div className="ed-result__head">
        <h2 className="ed-result__title" tabIndex={-1} ref={titleRef}>
          {rec ? r.title : r.titleBrowse}
        </h2>
        <p className="ed-result__lede">{r.lede}</p>
      </div>

      <ul className="ed-ladder">
        {ordered.map((c, i) => {
          const isRec = c.id === rec;
          return (
            <li
              key={c.id}
              className="ed-ladder__item"
              style={{ "--i": i } as CSSProperties}
            >
              <article
                className={`ed-card ${isRec ? "ed-card--rec" : ""}`.trim()}
                aria-label={isRec ? `${c.name}, ${r.recommended}` : c.name}
              >
                {isRec && (
                  <span className="ed-card__badge">
                    <CircleCheck size={14} aria-hidden="true" />
                    {r.recommended}
                  </span>
                )}
                <div className="ed-card__top">
                  <div>
                    <span className="ed-card__tag">{c.tag}</span>
                    <h3 className="ed-card__name">{c.name}</h3>
                    <p className="ed-card__ingredients">{c.ingredients}</p>
                  </div>
                  <p className="ed-card__price">
                    {r.fromLabel}
                    <strong>{c.from}</strong>
                    {r.perMonth}
                  </p>
                </div>
                <dl className="ed-card__facts">
                  <div>
                    <dt>{r.bestFor}</dt>
                    <dd>{c.bestFor}</dd>
                  </div>
                  <div>
                    <dt>{r.onset}</dt>
                    <dd>{c.onset}</dd>
                  </div>
                  <div>
                    <dt>{r.window}</dt>
                    <dd>{c.window}</dd>
                  </div>
                </dl>
                {c.note && <p className="ed-card__note">{c.note}</p>}
                {showAddon && c.id === "plus" && (
                  <p className="ed-card__note">{r.addonHint}</p>
                )}
                <div className="ed-card__cta">
                  <EdButton
                    href={INTAKE_HREF}
                    variant={isRec ? "ink" : "outline"}
                    className="ed-btn--block ed-btn--sm"
                  >
                    {r.cardCta}
                  </EdButton>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="ed-result__foot">
        <p className="ed-result__provider">{r.provider}</p>
        <ul className="ed-chips">
          {trustChips.map((t) => (
            <li key={t.label} className="ed-chip">
              <Check size={14} aria-hidden="true" />
              {t.label}
              <span>{t.text}</span>
            </li>
          ))}
        </ul>
        <SafetyStrip />
        <p className="ed-result__disclosure">{r.disclosure}</p>
        <div className="ed-result__actions">
          <button type="button" className="ed-textbtn" onClick={onRestart}>
            {qualifier.restart}
          </button>
        </div>
      </div>
    </div>
  );
}
