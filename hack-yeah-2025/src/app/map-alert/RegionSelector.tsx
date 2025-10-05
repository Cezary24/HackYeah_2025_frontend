"use client";

import { useState, useEffect } from "react";

// Dane województw z koordynatami środka i poziomem alertu
export interface VoivodeshipAlert {
  name: string;
  alertLevel: "red" | "yellow" | "none";
  center: [number, number]; // [lat, lng]
}

export const voivodeships: VoivodeshipAlert[] = [
  { name: "podlaskie", alertLevel: "red", center: [53.1325, 23.1688] }, // Białystok
  { name: "mazowieckie", alertLevel: "yellow", center: [52.2297, 21.0122] }, // Warszawa
  { name: "świętokrzyskie", alertLevel: "red", center: [50.8661, 20.6286] }, // Kielce
  { name: "lubelskie", alertLevel: "none", center: [51.2465, 22.5684] }, // Lublin
  { name: "podkarpackie", alertLevel: "none", center: [50.0413, 21.9991] }, // Rzeszów
  { name: "małopolskie", alertLevel: "none", center: [50.0647, 19.945] }, // Kraków
  { name: "śląskie", alertLevel: "none", center: [50.2649, 19.0238] }, // Katowice
  { name: "opolskie", alertLevel: "none", center: [50.6751, 17.9213] }, // Opole
  { name: "dolnośląskie", alertLevel: "none", center: [51.1079, 17.0385] }, // Wrocław
  { name: "lubuskie", alertLevel: "none", center: [52.7325, 15.2369] }, // Gorzów Wielkopolski
  { name: "wielkopolskie", alertLevel: "none", center: [52.4064, 16.9252] }, // Poznań
  {
    name: "zachodniopomorskie",
    alertLevel: "none",
    center: [53.4285, 14.5528], // Szczecin
  },
  { name: "pomorskie", alertLevel: "none", center: [54.352, 18.6466] }, // Gdańsk
  {
    name: "warmińsko-mazurskie",
    alertLevel: "none",
    center: [53.7784, 20.4801], // Olsztyn
  },
  {
    name: "kujawsko-pomorskie",
    alertLevel: "none",
    center: [53.0138, 18.5984], // Bydgoszcz
  },
  { name: "łódzkie", alertLevel: "none", center: [51.7592, 19.456] }, // Łódź
];

interface RegionSelectorProps {
  onVoivodeshipSelect: (voivodeship: VoivodeshipAlert) => void;
  currentRegion?: string;
}

interface VoivodeshipGeometry {
  name: string;
  path: string;
  centroid: [number, number];
}

export default function RegionSelector({
  onVoivodeshipSelect,
}: RegionSelectorProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [geometries, setGeometries] = useState<VoivodeshipGeometry[]>([]);

  useEffect(() => {
    // Wczytaj dane GeoJSON
    fetch("/GeoLocations/voivodeships.geojson")
      .then((res) => res.json())
      .then((data) => {
        // Konwertuj współrzędne geograficzne na SVG
        const converted = data.features.map(
          (feature: {
            geometry: { coordinates: number[][][] };
            properties: { nazwa: string };
          }) => {
            const coordinates = feature.geometry.coordinates[0];
            const name = feature.properties.nazwa;

            // Konwersja współrzędnych [lng, lat] na [x, y] SVG
            const svgPoints = coordinates.map((coord: number[]) => {
              const [lng, lat] = coord;
              // Transformacja: długość geograficzna -> x, szerokość -> y (odwrócona)
              const x = (lng - 14) * 50; // Skalowanie i przesunięcie
              const y = (54.5 - lat) * 50; // Odwrócenie osi Y i skalowanie
              return `${x},${y}`;
            });

            // Oblicz centroid dla ikon alertów
            const sumX = coordinates.reduce(
              (sum: number, c: number[]) => sum + (c[0] - 14) * 50,
              0
            );
            const sumY = coordinates.reduce(
              (sum: number, c: number[]) => sum + (54.5 - c[1]) * 50,
              0
            );
            const centroid: [number, number] = [
              sumX / coordinates.length,
              sumY / coordinates.length,
            ];

            return {
              name,
              path: `M ${svgPoints.join(" L ")} Z`,
              centroid,
            };
          }
        );

        setGeometries(converted);
      })
      .catch((error) => {
        console.error("Błąd wczytywania GeoJSON:", error);
      });
  }, []);

  const getAlertColor = (alertLevel: "red" | "yellow" | "none") => {
    switch (alertLevel) {
      case "red":
        return "#ef4444"; // Czerwony
      case "yellow":
        return "#f59e0b"; // Żółty/pomarańczowy
      case "none":
        return "#9ca3af"; // Szary
    }
  };

  const getAlertText = (alertLevel: "red" | "yellow" | "none") => {
    switch (alertLevel) {
      case "red":
        return "ALERT CZERWONY";
      case "yellow":
        return "ALERT ŻÓŁTY";
      case "none":
        return "Brak zagrożeń";
    }
  };

  if (geometries.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600">Ładowanie mapy...</p>
      </div>
    );
  }

  return (
    <div className="w-full  flex flex-col bg-white">
      {/* Nagłówek */}
      <div className="text-center pt-2 pb-2 px-2 flex-shrink-0">
        <h1 className="text-base sm:text-xl font-bold text-gray-800">
          Wybierz lokalizację
        </h1>
      </div>

      <div className="w-full px-4">
        <svg
          viewBox="0 -20 500 300"
          className="w-full"
          style={{ height: "auto", maxHeight: "50vh" }}
          preserveAspectRatio="xMidYMid meet"
        >
          {geometries.map((geometry) => {
            const voivodeship = voivodeships.find(
              (v) => v.name === geometry.name
            );
            if (!voivodeship) return null;

            return (
              <g key={geometry.name}>
                <path
                  d={geometry.path}
                  fill={getAlertColor(voivodeship.alertLevel)}
                  stroke="white"
                  strokeWidth="1"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => onVoivodeshipSelect(voivodeship)}
                  onMouseEnter={() => setHoveredRegion(geometry.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {voivodeship.alertLevel !== "none" && (
                  <text
                    x={geometry.centroid[0]}
                    y={geometry.centroid[1]}
                    fontSize="16"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none"
                  >
                    {voivodeship.alertLevel === "red" ? "❗" : "⚠️"}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legenda */}
      <div className="flex-shrink-0 pb-safe pb-20 sm:pb-4 px-2">
        <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-xs">
          <div className="flex items-center gap-1">
            <div
              className="w-2.5 h-2.5 rounded flex-shrink-0"
              style={{ backgroundColor: "#ef4444" }}
            ></div>
            <span className="text-gray-700">Czerwony</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-2.5 h-2.5 rounded flex-shrink-0"
              style={{ backgroundColor: "#f59e0b" }}
            ></div>
            <span className="text-gray-700">Żółty</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-2.5 h-2.5 rounded flex-shrink-0"
              style={{ backgroundColor: "#9ca3af" }}
            ></div>
            <span className="text-gray-700">Brak</span>
          </div>
        </div>

        {/* Informacja o najechaniu */}
        {hoveredRegion && (
          <div className="mt-1.5 p-1.5 bg-blue-50 rounded border border-blue-200">
            <p className="text-xs text-blue-800 font-medium text-center">
              {hoveredRegion.charAt(0).toUpperCase() + hoveredRegion.slice(1)} -{" "}
              {getAlertText(
                voivodeships.find((v) => v.name === hoveredRegion)!.alertLevel
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
