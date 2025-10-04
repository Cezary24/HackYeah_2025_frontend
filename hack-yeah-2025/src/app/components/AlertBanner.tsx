"use client";

import { useState } from "react";

type AlertLevel = "none" | "moderate" | "high";

interface AlertBannerProps {
  level?: AlertLevel;
}

export default function AlertBanner({ level = "high" }: AlertBannerProps) {
  const [alertLevel] = useState<AlertLevel>(level);

  const configs = {
    none: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-800",
      label: "Brak zagrożenia",
      icon: "✓",
    },
    moderate: {
      bg: "bg-orange-100",
      border: "border-orange-500",
      text: "text-orange-800",
      label: "Możliwe zagrożenie",
      icon: "⚠",
    },
    high: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-800",
      label: "Wysokie zagrożenie",
      icon: "❗",
    },
  };

  const config = configs[alertLevel];

  return (
    <div
      className={`${config.bg} ${config.border} ${config.text} border-2 px-4 py-3 rounded-lg shadow-sm flex items-center justify-between`}
    >
      <span className="font-semibold text-sm sm:text-base">{config.label}</span>
      <span className="text-xl sm:text-2xl">{config.icon}</span>
    </div>
  );
}
