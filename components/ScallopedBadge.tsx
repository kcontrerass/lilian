import React from "react";

interface ScallopedBadgeProps {
  className?: string;
  size?: number;
  scallops?: number;
  outerColor?: string; // hex color or CSS variable
  innerColor?: string; // hex color or CSS variable
  variant?: "solid" | "outline"; // solid uses inner circle, outline uses white wavy line
}

export default function ScallopedBadge({
  className = "",
  size = 100,
  scallops = 16,
  outerColor = "#ef6f28", // default lilian-orange-dark
  innerColor = "#3d246a", // default lilian-purple
  variant = "solid",
}: ScallopedBadgeProps) {
  const cx = size / 2;
  const cy = size / 2;
  const rBase = size * 0.4;
  const rAmp = size * 0.04; // amplitude of scallops
  const rInner = size * 0.32; // inner circle radius
  const rDot = size * 0.08; // center dot radius

  // Generate smooth scalloped path using polar equation: r = rBase + rAmp * cos(N * theta)
  const pathParts: string[] = [];
  const pathPartsInner: string[] = [];
  const numPoints = 120; // high sampling rate for smooth curve

  const rBaseInner = size * 0.31;
  const rAmpInner = size * 0.035;

  for (let i = 0; i < numPoints; i++) {
    const theta = (i * 2 * Math.PI) / numPoints;
    
    // Outer path
    const r = rBase + rAmp * Math.cos(scallops * theta);
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    pathParts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);

    // Inner path (for outline variant)
    if (variant === "outline") {
      const r2 = rBaseInner + rAmpInner * Math.cos(scallops * theta);
      const x2 = cx + r2 * Math.cos(theta);
      const y2 = cy + r2 * Math.sin(theta);
      pathPartsInner.push(`${i === 0 ? "M" : "L"} ${x2.toFixed(2)} ${y2.toFixed(2)}`);
    }
  }
  const pathD = pathParts.join(" ") + " Z";
  const pathDInner = variant === "outline" ? pathPartsInner.join(" ") + " Z" : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer scalloped shape */}
      <path d={pathD} fill={outerColor} />
      
      {variant === "solid" ? (
        <>
          {/* Inner circle */}
          <circle cx={cx} cy={cy} r={rInner} fill={innerColor} />
          {/* Center dot */}
          <circle cx={cx} cy={cy} r={rDot} fill={outerColor} />
        </>
      ) : (
        <>
          {/* Inner wavy stroke */}
          <path d={pathDInner} stroke="white" strokeWidth={size * 0.025} strokeLinejoin="round" fill="none" />
          {/* Big Center dot */}
          <circle cx={cx} cy={cy} r={size * 0.18} fill={innerColor} />
        </>
      )}
    </svg>
  );
}
