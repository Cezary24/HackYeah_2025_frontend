"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useCallback } from "react";
import type { FeatureCollection, Feature, Point, Polygon } from "geojson";

// Napraw domyślne ikony Leaflet w Next.js
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

// Komponent do ładowania i wyświetlania danych GeoJSON
function BunkersLayer() {
  const map = useMap();
  const [allBunkers, setAllBunkers] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);

  // Stwórz niestandardową ikonę dla bunkerów
  const bunkerIcon = L.icon({
    iconUrl: "/assets/bunker.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Funkcja do filtrowania bunkerów na podstawie granic mapy
  const filterBunkersByBounds = useCallback(
    (data: FeatureCollection, bounds: L.LatLngBounds) => {
      if (!data || !data.features) return null;

      const filtered: FeatureCollection = {
        ...data,
        features: data.features.filter((feature) => {
          if (feature.geometry.type === "Point") {
            const point = feature.geometry as Point;
            const [lng, lat] = point.coordinates;
            return bounds.contains([lat, lng]);
          } else if (feature.geometry.type === "Polygon") {
            // Sprawdź czy którykolwiek punkt poligonu jest w granicach
            const polygon = feature.geometry as Polygon;
            const coords = polygon.coordinates[0];
            return coords.some((coord) =>
              bounds.contains([coord[1], coord[0]])
            );
          }
          return false;
        }),
      };

      console.log(
        `Wyświetlam ${filtered.features.length} bunkerów z ${data.features.length}`
      );
      return filtered;
    },
    []
  );

  // Funkcja do tworzenia warstwy GeoJSON
  const createGeoJSONLayer = useCallback(
    (data: FeatureCollection) => {
      return L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            const props = feature.properties;
            let popupContent = `<div style="max-width: 200px;">`;

            if (props.name) {
              popupContent += `<strong>${props.name}</strong><br/>`;
            }
            if (props.military) {
              popupContent += `Typ: ${props.military}<br/>`;
            }
            if (props["addr:city"]) {
              popupContent += `Miasto: ${props["addr:city"]}<br/>`;
            }
            if (props.website) {
              popupContent += `<a href="${props.website}" target="_blank">Strona WWW</a><br/>`;
            }

            popupContent += `</div>`;
            layer.bindPopup(popupContent);
          }
        },
        pointToLayer: (_feature, latlng) => {
          return L.marker(latlng, { icon: bunkerIcon });
        },
        style: () => {
          return {
            fillColor: "#ff7800",
            weight: 2,
            opacity: 1,
            color: "#ff7800",
            fillOpacity: 0.5,
          };
        },
      });
    },
    [bunkerIcon]
  );

  useEffect(() => {
    fetch("/bunkers/bunkers_location_pl.geojson")
      .then((response) => response.json())
      .then((data) => {
        setAllBunkers(data);
        setLoading(false);
        console.log(`Załadowano ${data.features.length} bunkerów`);
      })
      .catch((error) => {
        console.error("Błąd ładowania danych GeoJSON:", error);
        setLoading(false);
      });
  }, []);

  // Aktualizuj warstwę przy zmianie widoku mapy
  useEffect(() => {
    if (!allBunkers) return;

    let geoJsonLayer: L.GeoJSON | null = null;

    const updateLayer = () => {
      // Usuń poprzednią warstwę
      if (geoJsonLayer) {
        geoJsonLayer.remove();
      }

      // Pobierz aktualne granice mapy z marginesem
      const bounds = map.getBounds().pad(0.1); // 10% marginesu

      // Filtruj bunkery
      const filteredData = filterBunkersByBounds(allBunkers, bounds);

      if (filteredData && filteredData.features.length > 0) {
        // Utwórz nową warstwę
        geoJsonLayer = createGeoJSONLayer(filteredData);
        geoJsonLayer.addTo(map);
      }
    };

    // Aktualizuj warstwę na początku
    updateLayer();

    // Dodaj listener na ruch mapy (moveend uruchamia się po zakończeniu przesuwania/zoomowania)
    map.on("moveend", updateLayer);

    // Cleanup
    return () => {
      map.off("moveend", updateLayer);
      if (geoJsonLayer) {
        geoJsonLayer.remove();
      }
    };
  }, [map, allBunkers, bunkerIcon, filterBunkersByBounds, createGeoJSONLayer]);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "5px",
          zIndex: 1000,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        Ładowanie bunkerów...
      </div>
    );
  }

  return null;
}

// Komponent do pokazywania lokalizacji użytkownika
function LocationMarker() {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // Ikona dla lokalizacji użytkownika
  const userIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const getLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    // Sprawdź czy przeglądarka wspiera geolokalizację
    if (!navigator.geolocation) {
      setError("Twoja przeglądarka nie wspiera geolokalizacji");
      setLoading(false);
      return;
    }

    console.log("Próba pobrania lokalizacji...");

    // Spróbuj najpierw z enableHighAccuracy
    const tryGetPosition = (useHighAccuracy: boolean) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          console.log(
            `Lokalizacja pobrana: ${latitude}, ${longitude}, dokładność: ${accuracy}m`
          );
          setPosition([latitude, longitude]);
          setLoading(false);
          // Wyśrodkuj mapę na lokalizacji użytkownika
          map.setView([latitude, longitude], 13);
        },
        (err) => {
          console.error("Błąd pobierania lokalizacji:", err);

          // Jeśli to był timeout z wysoką dokładnością, spróbuj bez niej
          if (err.code === err.TIMEOUT && useHighAccuracy) {
            console.log("Timeout z wysoką dokładnością, próbuję bez niej...");
            tryGetPosition(false);
            return;
          }

          setLoading(false);
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError(
                "Odmowa dostępu do lokalizacji. Sprawdź uprawnienia w ustawieniach przeglądarki."
              );
              break;
            case err.POSITION_UNAVAILABLE:
              setError(
                "Lokalizacja niedostępna. Upewnij się, że GPS jest włączony."
              );
              break;
            case err.TIMEOUT:
              setError("Upłynął limit czasu. Kliknij aby spróbować ponownie.");
              break;
            default:
              setError(`Błąd pobierania lokalizacji (kod: ${err.code})`);
          }
        },
        {
          enableHighAccuracy: useHighAccuracy,
          timeout: useHighAccuracy ? 10000 : 15000, // 10s z GPS, 15s bez
          maximumAge: 30000, // Akceptuj lokalizację z ostatnich 30 sekund
        }
      );
    };

    tryGetPosition(true);
  }, [map]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "5px",
          zIndex: 1000,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          color: "#333",
        }}
      >
        📍 Pobieranie lokalizacji...
      </div>
    );
  }

  // Jeśli jest błąd, pokaż komunikat z przyciskiem ponowienia
  if (error) {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "5px",
          zIndex: 1000,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          maxWidth: "250px",
        }}
      >
        <div style={{ color: "red", marginBottom: "8px", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
        <button
          onClick={() => {
            setRetryCount((prev) => prev + 1);
            getLocation();
          }}
          style={{
            background: "#3b82f6",
            color: "white",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            width: "100%",
          }}
        >
          🔄 Spróbuj ponownie
        </button>
      </div>
    );
  }

  // Jeśli mamy pozycję, pokaż marker
  if (position) {
    return (
      <Marker position={position} icon={userIcon}>
        <Popup>
          <strong>Twoja lokalizacja</strong>
          <br />
          Szerokość: {position[0].toFixed(6)}
          <br />
          Długość: {position[1].toFixed(6)}
        </Popup>
      </Marker>
    );
  }

  return null;
}

export default function MapComponent() {
  return (
    <MapContainer
      center={[52.0, 19.0]} // Centrum Polski
      zoom={7} // Domyślny zoom
      minZoom={6} // Minimalny zoom (cała Polska)
      maxZoom={18} // Maksymalny zoom (szczegóły ulic)
      scrollWheelZoom={true}
      zoomControl={true} // Przyciski +/- do zoomowania
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <BunkersLayer />
    </MapContainer>
  );
}
