"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Video {
  id: string;
  url: string;
  title: string;
}

const videos: Video[] = [
  { id: "1", url: "https://www.youtube.com/shorts/nD4TQtF1baM", title: "Review 1" },
  { id: "2", url: "https://www.youtube.com/shorts/pqMB0bl6IIE", title: "Review 2" },
  { id: "3", url: "https://www.youtube.com/shorts/KLIzmqIapaU", title: "Review 3" },
  { id: "4", url: "https://www.youtube.com/shorts/pqMB0bl6IIE", title: "Review 4" },
  { id: "5", url: "https://www.youtube.com/shorts/KLIzmqIapaU", title: "Review 5" },
];

const parseVideo = (url: string): { type: "youtube" | "vimeo"; id: string } => {
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (youtubeMatch) return { type: "youtube", id: youtubeMatch[1] };

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { type: "vimeo", id: vimeoMatch[1] };

  return { type: "youtube", id: url };
};

const getThumbnail = (url: string) => {
  const { type, id } = parseVideo(url);
  if (type === "youtube") return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return `https://vumbnail.com/${id}.jpg`;
};

const getEmbedUrl = (url: string) => {
  const { type, id } = parseVideo(url);
  if (type === "youtube") return `https://www.youtube.com/embed/${id}?autoplay=1`;
  return `https://player.vimeo.com/video/${id}?autoplay=1`;
};

const VideoCard = ({ video }: { video: Video }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-9/14 overflow-hidden rounded-4xl bg-gray-300">
      {playing ? (
        <>
          <iframe
            src={getEmbedUrl(video.url)}
            title={video.title}
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm bg-white/5 text-white focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close video"
          >
            ×
          </button>
        </>
      ) : (
        <>
          <Image
            src={getThumbnail(video.url)}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover scale-[1.35]"
          />
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Play video"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full backdrop-blur-sm bg-white/5">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export const Reviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("init", onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("init", onSelect);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="max-w-2xl mx-auto py-16 text-[#242424] lg:max-w-none lg:py-24">
      <h2 className="text-center text-3xl font-bold leading-tight tracking-tight px-4 sm:hidden">
        Join 200,000+ achieving real, lasting weight loss
      </h2>
      <h2 className="hidden text-center text-3xl font-bold leading-tight tracking-tight sm:block lg:text-[44px]">
        Join 200,000+ achieving<br />real, lasting weight loss
      </h2>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex ml-[-16px]">
          {videos.map((video) => (
            <div key={video.id} className="min-w-0 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 pl-4">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="arrow-shadow flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-[#CF88C9] transition-colors"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9.9521 17.3075L4.2981 11.6538L9.9521 6L11.0058 7.0845L7.1866 10.9038H19.7021V12.4038H7.1866L11.0058 16.223L9.9521 17.3075Z" fill="#040404"/>
            </svg>
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="arrow-shadow flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-[#CF88C9] transition-colors"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.8462 17.3075L12.7923 16.223L16.6115 12.4038H4.5V10.9038H16.6115L12.7923 7.0845L13.8462 6L19.5 11.6538L13.8462 17.3075Z" fill="#040404"/>
            </svg>
          </button>
        </div>
        <div className="flex gap-1.5">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-[#CF88C9] ${selectedIndex === index ? "bg-[#CF88C9]" : "bg-gray-300"}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={selectedIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
