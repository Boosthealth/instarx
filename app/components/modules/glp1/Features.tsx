import Image from "next/image";

const items = [
  {
    image: "/glp1/Image-1.webp",
    alt: "Compounded GLP-1 medication vial",
    title: "Compounded\nGLP-1 medications",
    description:
      "Start your InstaRx weight loss journey with peace of mind, knowing that all compounded GLP-1 medications are sourced from rigorously regulated and licensed pharmacies. Maximizing patient outcomes is our primary goal.",
  },
  {
    image: "/glp1/image_2.webp",
    alt: "Licensed healthcare provider",
    title: "Setting the Gold Standard for Care, Fast Shipping and Patient Care",
    description:
      "At InstaRx, your well-being and safety is our top priority which is why we partnered with compounding pharmacies that are state-regulated. These pharmacies adhere to strict regulatory board standards to ensure the safety and quality of our compounded GLP-1 medication prescriptions.",
  },
];

export default function Features() {
  return (
    <section className="bg-[var(--glp1-feature-bg)]">
      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-16 flex flex-col gap-12">
        {items.map(({ image, alt, title, description }, i) => (
          <div key={title} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-36">

            {/* Image card */}
            <div
              data-reveal="slide-left"
              style={{ transitionDelay: `${i * 80}ms` }}
              className="relative rounded-2xl overflow-hidden bg-[#eef3f8] aspect-[5/4]"
            >
              {/* Decorative blobs */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-blue-300/60" />
              <div className="absolute top-8 right-10 w-10 h-10 rounded-full bg-blue-400/40" />
              <div className="absolute bottom-4 right-6 w-12 h-12 rounded-full bg-[#c9a882]/50" />
              <div className="absolute bottom-8 right-14 w-8 h-8 rounded-full bg-[#b8956e]/40" />
              <Image
                src={image}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text */}
            <div data-reveal="slide-right" style={{ transitionDelay: `${i * 80 + 130}ms` }}>
              <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 leading-snug mb-4 whitespace-pre-line font-[family-name:var(--font-inter)]">
                {title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{description}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
