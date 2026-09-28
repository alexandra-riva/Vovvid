import { useId } from "react";
import {
  V1_PATH,
  V2_PATH,
  V3_STEM_PATH,
  TAIL_PATH,
  ID_BAR_PATH,
  ID_D_PATH,
} from "./logo-paths";

type LogoTheme = "day" | "night";

const STOPS: Record<LogoTheme, string[]> = {
  day: ["#B74362", "#C84B59", "#D45950", "#DA6C4D", "#DA8154"],
  night: ["#F06C8F", "#FF7582", "#FF8576", "#FF9A72", "#FFB17B"],
};

const MARK: Record<LogoTheme, string> = {
  day: "#4B092A",
  night: "#F4E5D4",
};

export function Logo({
  theme,
  className,
}: {
  theme: LogoTheme;
  className?: string;
}) {
  const rawId = useId();
  const gradientId = `vovvid-grad-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const tailClass = `vovvid-tail-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const stops = STOPS[theme];
  const mark = MARK[theme];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -18 332 100"
      role="img"
      aria-label="VovvID"
      className={className}
    >
      <style>{`
.${tailClass}{transform-origin:209px 74px;transform-box:view-box;animation:vovvid-wag 3.2s ease-in-out infinite}
@keyframes vovvid-wag{0%,52%,100%{transform:rotate(0deg)}60%{transform:rotate(-7deg)}68%{transform:rotate(2deg)}76%{transform:rotate(-6deg)}86%{transform:rotate(1deg)}}
@media (prefers-reduced-motion:reduce){.${tailClass}{animation:none}}
`}</style>
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="254"
          y1="80.5"
          x2="325"
          y2="15.5"
        >
          <stop offset="0.00" stopColor={stops[0]} />
          <stop offset="0.25" stopColor={stops[1]} />
          <stop offset="0.50" stopColor={stops[2]} />
          <stop offset="0.75" stopColor={stops[3]} />
          <stop offset="1.00" stopColor={stops[4]} />
        </linearGradient>
      </defs>
      <g fill={mark}>
        <path d={V1_PATH} />
        <circle cx="92" cy="48" r="22" fill="none" stroke={mark} strokeWidth="13" />
        <path d={V2_PATH} />
        <path d={V3_STEM_PATH} />
        <path className={tailClass} d={TAIL_PATH} />
      </g>
      <path d={ID_BAR_PATH} fill={`url(#${gradientId})`} />
      <path d={ID_D_PATH} fill={`url(#${gradientId})`} fillRule="evenodd" />
    </svg>
  );
}
