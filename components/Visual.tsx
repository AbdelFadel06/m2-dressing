import Image from "next/image";
import { LoopVideo } from "./LoopVideo";
import type { Colors, PatternKey } from "@/lib/products";

/** Motif façon pagne, utilisé tant qu'il n'y a pas de vraie photo. */
export function Pattern({
  pattern,
  colors,
  uid,
}: {
  pattern: PatternKey;
  colors: Colors;
  uid: string;
}) {
  const [a, b, c] = colors;
  const pid = `pat-${uid}`;

  const defs: Record<PatternKey, React.ReactNode> = {
    circles: (
      <pattern id={pid} width="44" height="44" patternUnits="userSpaceOnUse">
        <rect width="44" height="44" fill={a} />
        <circle cx="22" cy="22" r="18" fill={b} />
        <circle cx="22" cy="22" r="11" fill={a} />
        <circle cx="22" cy="22" r="4.5" fill={c} />
      </pattern>
    ),
    diamonds: (
      <pattern id={pid} width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill={a} />
        <polygon points="20,2 38,20 20,38 2,20" fill={b} />
        <polygon points="20,12 28,20 20,28 12,20" fill={c} />
      </pattern>
    ),
    stripes: (
      <pattern
        id={pid}
        width="36"
        height="36"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(35)"
      >
        <rect width="36" height="36" fill={a} />
        <rect width="14" height="36" fill={b} />
        <rect x="22" width="4" height="36" fill={c} />
      </pattern>
    ),
    waves: (
      <pattern id={pid} width="40" height="24" patternUnits="userSpaceOnUse">
        <rect width="40" height="24" fill={a} />
        <path d="M0 12 Q10 0 20 12 T40 12" stroke={b} strokeWidth="5" fill="none" />
        <path d="M0 24 Q10 12 20 24 T40 24" stroke={c} strokeWidth="2.5" fill="none" />
      </pattern>
    ),
    squares: (
      <pattern id={pid} width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill={a} />
        <rect x="4" y="4" width="32" height="32" fill={b} />
        <rect x="12" y="12" width="16" height="16" fill={a} />
        <rect x="17" y="17" width="6" height="6" fill={c} />
      </pattern>
    ),
    leaves: (
      <pattern id={pid} width="48" height="48" patternUnits="userSpaceOnUse">
        <rect width="48" height="48" fill={a} />
        <ellipse cx="14" cy="14" rx="12" ry="5" fill={b} transform="rotate(-40 14 14)" />
        <ellipse cx="36" cy="36" rx="12" ry="5" fill={b} transform="rotate(-40 36 36)" />
        <circle cx="36" cy="12" r="3.5" fill={c} />
        <circle cx="12" cy="36" r="3.5" fill={c} />
      </pattern>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      className="absolute inset-0 h-full w-full"
    >
      <defs>{defs[pattern]}</defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

/** Zone visuelle d'un article : vraie photo si disponible, sinon motif. */
export function Visual({
  id,
  name,
  pattern,
  colors,
  image,
  video,
  position,
  className = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
}: {
  id: string;
  name: string;
  pattern: PatternKey;
  colors: Colors;
  image?: string;
  video?: string;
  position?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden bg-white ${image || video ? "" : "grayscale"} ${className}`}>
      {video ? (
        <LoopVideo src={video} poster={image} label={name} />
      ) : image ? (
        <Image src={image} alt={name} fill sizes={sizes} className="object-cover object-top" style={position ? { objectPosition: position } : undefined} />
      ) : (
        <Pattern pattern={pattern} colors={colors} uid={id} />
      )}
    </div>
  );
}
