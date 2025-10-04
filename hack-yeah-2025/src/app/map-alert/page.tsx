"use client";

import dynamic from "next/dynamic";

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
  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
}
