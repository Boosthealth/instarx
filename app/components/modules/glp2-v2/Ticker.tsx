import { tickerItems } from "./content";

/* Slim announcement marquee. The track is rendered twice back-to-back and
 * translated -50% so the loop is seamless (see `.v2-ticker__track` / keyframes
 * in glp2-v2.css). aria-hidden on the duplicate so it's not double-announced. */
export function Ticker() {
  return (
    <div className="v2-ticker" role="region" aria-label="InstaRx highlights">
      <div className="v2-ticker__track">
        {tickerItems.map((item, i) => (
          <span key={`a-${i}`} className="v2-ticker__item">
            {item}
          </span>
        ))}
        {tickerItems.map((item, i) => (
          <span key={`b-${i}`} className="v2-ticker__item" aria-hidden="true">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
