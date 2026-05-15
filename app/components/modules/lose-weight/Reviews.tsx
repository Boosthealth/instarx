"use client";

import useEmblaCarousel from "embla-carousel-react";

const reviews = [
  {
    title: "What a great company!",
    text: "The customer service is spot on (Concierge Style) individualized personal attention, quick response time and a great product. I am 100% happy and will continue with Insta Rx.",
    author: "Alex B.",
  },
  {
    title: "I feel 10 years younger and my energy is...",
    text: "I have lost 28 lbs and all my cravings. No side effects and the results are amazing! Thank you Insta!",
    author: "Sara P.",
  },
  {
    title: "WOW!",
    text: "I've lost 10 lbs in my first month!! So excited about life again.",
    author: "Amy J.",
  },
  {
    title: "Life-Changing!",
    text: "I feel healthier, more confident, and whenever I have any questions the Insta team has been very helpful.",
    author: "Darlene N.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-2 h-full">
      <Stars />
      <p className="font-semibold text-gray-900 text-sm leading-snug">{review.title}</p>
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{review.text}</p>
      <p className="text-sm text-gray-500 mt-2">— {review.author}</p>
    </div>
  );
}

export function Reviews() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    <section className="bg-gray-100 py-16" id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl text-gray-900 text-center mb-4">
          10k+ Happy Customers :)
        </h2>
        <p className="text-center text-gray-700 text-lg mb-10 md:text-xl md:mb-16">
          Real people. Real weight loss. See what our customers have to say.
        </p>

        {/* Mobile/tablet: embla carousel */}
        <div className="block lg:hidden">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4">
              {reviews.map((review, i) => (
                <div key={i} className="flex-none w-[80vw] md:w-[45vw]">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: 4 columns grid */}
        <div className="hidden lg:grid grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
