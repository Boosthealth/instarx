import { Dumbbell, LockKeyhole, TriangleAlert } from "lucide-react";

const CARDS = [
  {
    icon: Dumbbell,
    eyebrow: "Months 1–2",
    title: "The Warm-Up",
    body: "The first 2 months are preparation. Your body is safely adjusting to the medication and your dose is still ramping up.",
  },
  {
    icon: TriangleAlert,
    eyebrow: "The Trap",
    title: "Most People Quit Here",
    body: "Month-to-month plans tempt you to quit out of frustration because the dose is still too low for the best results. Most people quit here.",
    danger: true,
  },
  {
    icon: LockKeyhole,
    eyebrow: "The Fix",
    title: "The Solution",
    body: "Committing to 4 months locks you in and carries you across the finish line into the breakthrough phase, where the weight actually starts coming off. And month 4 is on us.",
  },
];

export function Trap() {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:py-24" data-track-section="trap">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance text-gray-900 leading-tight mb-4">
            Why quitting early sets you up to fail
          </h2>
          <p className="text-lg text-gray-700 text-pretty md:text-xl">
            The diet industry sells &quot;overnight results.&quot; Your body doesn&apos;t work that way. Quitting your
            medication in the first 60 days is like walking out of the gym while you&apos;re still stretching.
          </p>
        </div>
        <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
          {CARDS.map(({ icon: Icon, ...card }) => (
            <li
              key={card.title}
              className={`relative flex flex-col rounded-2xl bg-white p-6 md:p-8 ${card.danger ? "ring-2 ring-orange-600" : ""}`}
            >
              {card.danger && (
                <span className="absolute -top-3 right-6 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
                  The danger zone
                </span>
              )}
              <span
                className={`flex size-12 items-center justify-center rounded-xl mb-6 ${card.danger ? "bg-orange-50 text-orange-700" : "bg-gray-100 text-gray-900"}`}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <p className="font-semibold text-orange-700 mb-1">{card.eyebrow}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-700 leading-relaxed">{card.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
