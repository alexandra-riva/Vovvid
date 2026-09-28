import { V3_STEM_PATH, TAIL_PATH } from "./logo-paths";

/**
 * The check mark from the logo: the last V's stem plus the sweeping tail.
 * Not animated.
 */
export function TailCheck({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="183 -14 96 96"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d={V3_STEM_PATH} />
      <path d={TAIL_PATH} />
    </svg>
  );
}
