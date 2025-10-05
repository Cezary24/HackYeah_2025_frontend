"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import RegionSelector, {
  voivodeships,
  type VoivodeshipAlert,
} from "./RegionSelector";

// Dynamiczny import mapy z wyłączonym SSR
const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "600px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f0f0",
      }}
    >
      Ładowanie mapy...
    </div>
  ),
});

export default function AlertMap() {
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<VoivodeshipAlert>(
    voivodeships.find((v) => v.name === "lubuskie")!
  );

  const handleRegionSelect = (voivodeship: VoivodeshipAlert) => {
    setSelectedRegion(voivodeship);
    setShowRegionSelector(false);
  };

  const getAlertColor = (alertLevel: "red" | "yellow" | "none") => {
    switch (alertLevel) {
      case "red":
        return "#fee2e2"; // Jasny czerwony
      case "yellow":
        return "#fef3c7"; // Jasny żółty
      case "none":
        return "#f0fdf4"; // Jasny zielony
    }
  };

  const getAlertBorderColor = (alertLevel: "red" | "yellow" | "none") => {
    switch (alertLevel) {
      case "red":
        return "#ef4444";
      case "yellow":
        return "#f59e0b";
      case "none":
        return "#22c55e";
    }
  };

  if (showRegionSelector) {
    return (
      <RegionSelector
        onVoivodeshipSelect={handleRegionSelect}
        currentRegion={selectedRegion.name}
      />
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      {/* Baner z informacją o regionie */}
      <div
        className="flex-shrink-0 z-[1000] p-3 sm:p-6 shadow-md border-l-4"
        style={{
          backgroundColor: getAlertColor(selectedRegion.alertLevel),
          borderLeftColor: getAlertBorderColor(selectedRegion.alertLevel),
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 sm:mb-2">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-800">
              Zagrożenia w Twoim regionie
            </h2>
            <button
              onClick={() => setShowRegionSelector(true)}
              className="px-3 py-1.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg text-xs sm:text-base font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Zmień lokalizację
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1 sm:mt-0">
            <span className="text-lg sm:text-3xl font-bold text-gray-900 capitalize">
              {selectedRegion.name}
            </span>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="flex-1 overflow-hidden">
        <MapWithNoSSR
          key={selectedRegion.name}
          center={selectedRegion.center}
        />
      </div>
    </div>
  );
}
