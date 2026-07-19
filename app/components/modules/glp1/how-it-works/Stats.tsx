import { stats, statsFootnote } from "./content";

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 sm:py-16">
      <div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              data-reveal="up"
              style={{ transitionDelay: `${i * 100}ms` }}
              className="text-center"
            >
              <p className="whitespace-nowrap text-4xl font-semibold text-gray-900 sm:text-5xl font-[family-name:var(--font-inter)]">
                {stat.value}
                {stat.note && (
                  <sup className="align-top text-sm font-normal text-gray-500">*</sup>
                )}
              </p>
              <p className="mx-auto mt-3 max-w-[16rem] text-gray-800 leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-gray-600">{statsFootnote}</p>
      </div>
    </section>
  );
}
