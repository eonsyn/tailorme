import React from "react";
import { CheckCircle } from "lucide-react";

function Completeness({ completeness }) {
  const radius = 30; // radius of circle
  const stroke = 8; // thickness of stroke
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (completeness / 100) * circumference;

  return (
    <div className="fixed drop-shadow-2xl  bottom-4 right-4 flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb" // light gray background
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#4f46e5" // purple progress
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-lg font-semibold fill-foreground "
        >
          {completeness}%
        </text>
      </svg>
       
    </div>
  );
}

export default Completeness;
