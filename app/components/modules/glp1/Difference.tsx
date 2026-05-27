import Image from "next/image";

const items = [
  {
    icon: "/glp1/Clinic.svg",
    title: "Clinical Care",
    description:
      "Prescriptions are sent only to compounding pharmacies adhering to strict regulatory standards.",
  },
  {
    icon: "/glp1/Fast.svg",
    title: "Fast Free Shipping",
    description:
      "Receive your prescriptions fast. Not a week later. And you don't have to pay extra.",
  },
  {
    icon: "/glp1/Lasting.svg",
    title: "Lasting Results",
    description:
      "There are already millions of GLP-1 weight loss success stories (and more every day)!",
  },
];

export default function Difference() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 sm:py-16">
      <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-12 font-[family-name:var(--font-inter)]">
        The InstaRx difference
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map(({ icon, title, description }, i) => (
          <div
            key={title}
            data-reveal="up"
            style={{ transitionDelay: `${i * 110}ms` }}
            className="flex flex-col gap-4 px-6 md:px-10 last:pr-0 border-l border-gray-200"
          >
            <Image
              src={icon}
              alt=""
              aria-hidden="true"
              width={48}
              height={48}
              className="shrink-0"
              unoptimized
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-[family-name:var(--font-inter)]">{title}</h3>
              <p className="text-gray-800 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
