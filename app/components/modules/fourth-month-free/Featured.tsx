import Image from "next/image";

const PRESS = [["/lose-weight/press/ok-magazine.svg", "OK! magazine"], ["/lose-weight/press/balancing-act.svg", "The Balancing Act"], ["/lose-weight/press/womans-world.svg", "Woman's World"], ["/lose-weight/press/la-weekly.svg", "LA Weekly"], ["/lose-weight/press/lifetime.svg", "Lifetime"], ["/lose-weight/press/health-uncensored.svg", "Health Uncensored"]] as const;

export function Featured() {
  return <section className="m4-featured" aria-label="As featured in"><p>As featured in</p><div className="m4-marquee"><ul>{[...PRESS, ...PRESS].map(([src, alt], i) => <li key={`${src}-${i}`}><Image src={src} alt={i < PRESS.length ? alt : ""} width={150} height={42} /></li>)}</ul></div></section>;
}

