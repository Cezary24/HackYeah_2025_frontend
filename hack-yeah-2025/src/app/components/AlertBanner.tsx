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
      bg: "#7a9c59",
      label: "Brak zagrożenia",
      icon: "✓",
    },
    moderate: {
      bg: "#c89659",
      label: "Możliwe zagrożenie",
      icon: "!",
    },
    high: {
      bg: "#9b2c2c",
      label: "Wysokie zagrożenie",
      icon: "!",
    },
  };

  const config = configs[alertLevel];

  return (
    <div
      className="px-6 py-4 rounded-lg shadow-md flex items-center gap-4"
      style={{ backgroundColor: config.bg }}
    >
      <div className="flex items-center gap-3 flex-1">
        {alertLevel === "none" ? (
          <div className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">{config.icon}</span>
          </div>
        ) : (
          <div className="relative flex-shrink-0">
            <svg
              width="36"
              height="32"
              viewBox="0 0 36 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 0L35.3205 30H0.679492L18 0Z"
                fill="white"
                fillOpacity="0.3"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold pb-1">
              {config.icon}
            </span>
          </div>
        )}
        <span className="font-semibold text-base sm:text-lg text-white">
          {config.label}
        </span>
      </div>
    </div>
  );
}
