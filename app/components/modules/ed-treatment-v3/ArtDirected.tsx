import { getImageProps } from "next/image";

/* Full-bleed art-directed photo: a tall crop below 48rem, the wide crop above.
 * getImageProps keeps Next's optimizer and srcset for both sources. */
export function ArtDirected({
  wide,
  tall,
  alt,
  priority = false,
  className = "",
}: {
  wide: string;
  tall: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const common = { alt, sizes: "100vw", quality: 80, priority };
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, src: wide, width: 2400, height: 1350 });
  const {
    props: { srcSet: tallSet, ...rest },
  } = getImageProps({ ...common, src: tall, width: 1200, height: 1500 });

  return (
    <picture className={className}>
      <source media="(min-width: 48rem)" srcSet={wideSet} />
      <source srcSet={tallSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from rest */}
      <img {...rest} />
    </picture>
  );
}
