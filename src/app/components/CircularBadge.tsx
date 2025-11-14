"use client";

type Props = {
  text?: string;
  size?: number;     // px
  onClick?: () => void;
};

export default function CircularBadge({
  text = "MY WORK EXPERIENCE • MY WORK EXPERIENCE •",
  size = 160,
  onClick,
}: Props) {
  const r = 60;               // text radius
  const view = 200;           // svg viewBox edge
  return (
    <button
      onClick={onClick}
      className="group absolute right-6 lg:right-10 top-1/2 -translate-y-1/2
                 rounded-full select-none"
      style={{ width: size, height: size }}
      aria-label="Open projects"
    >
      <svg
        viewBox={`0 0 ${view} ${view}`}
        className="w-full h-full drop-shadow-[0_6px_20px_rgba(0,0,0,.35)]"
      >
        {/* outer ring */}
        <circle
          cx={view / 2}
          cy={view / 2}
          r={r + 24}
          className="fill-[rgba(255,255,255,0.06)] stroke-[rgba(255,255,255,0.25)]"
          strokeWidth="1.5"
        />

        {/* circular text path */}
        <defs>
          <path
            id="badgePath"
            d={`M ${view/2},${view/2} m -${r},0 a ${r},${r} 0 1,1 ${r*2},0 a ${r},${r} 0 1,1 -${r*2},0`}
          />
        </defs>
        <g className="origin-center animate-[spin_12s_linear_infinite] group-hover:[animation-duration:6s]">
          <text
            fontSize="14"
            fontWeight={600}
            className="fill-white/80 tracking-[0.2em] uppercase"
          >
            <textPath href="#badgePath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </g>

        {/* center arrow button */}
        <g className="cursor-pointer">
          <circle
            cx={view / 2}
            cy={view / 2}
            r="34"
            className="fill-white"
          />
          {/* arrow (points to the right) */}
          <path
            d="M88 100 L112 100 M104 92 L112 100 L104 108"
            className="stroke-black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </button>
  );
}
