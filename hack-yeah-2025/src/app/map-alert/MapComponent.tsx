"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useCallback } from "react";
import type { FeatureCollection, Point, Polygon } from "geojson";

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
          padding: "8px",
          borderRadius: "5px",
          zIndex: 1000,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          fontSize: "12px",
        }}
      >
        Ładowanie...
      </div>
    );
  }

  return null;
}

// Komponent do wyświetlania poligonów ostrzeżeń z GeoJSON
function AlertPolygonsLayer() {
  const map = useMap();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let geoJsonLayer: L.GeoJSON | null = null;

    fetch("/GeoLocations/message.geojson")
      .then((response) => response.json())
      .then((data: FeatureCollection) => {
        console.log("Załadowano poligony:", data.features?.length);

        geoJsonLayer = L.geoJSON(data, {
          style: () => ({
            fillColor: "#ff0000",
            weight: 2,
            opacity: 0.7,
            color: "#cc0000",
            fillOpacity: 0.3,
          }),
          onEachFeature: (_feature, layer) => {
            layer.bindPopup(
              '<div style="padding: 5px;"><strong style="color: #cc0000;">⚠️ Strefa ostrzeżenia</strong></div>'
            );
          },
        });

        geoJsonLayer.addTo(map);
        setLoading(false);
        console.log("Poligony dodane do mapy");
      })
      .catch((error) => {
        console.error("Błąd ładowania poligonów:", error);
        setLoading(false);
      });

    return () => {
      if (geoJsonLayer) {
        geoJsonLayer.remove();
      }
    };
  }, [map]);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "white",
          padding: "6px 10px",
          borderRadius: "4px",
          zIndex: 1000,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          fontSize: "11px",
        }}
      >
        Ładowanie stref...
      </div>
    );
  }

  return null;
}

// Komponent do pokazywania lokalizacji użytkownika
function LocationMarker({
  shouldCenterOnUser = false,
  disableAutoCenter = false,
}: {
  shouldCenterOnUser?: boolean;
  disableAutoCenter?: boolean;
}) {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
          // Centruj mapę tylko jeśli:
          // - użytkownik kliknął przycisk (shouldCenterOnUser)
          // - LUB jest to pierwsze załadowanie I użytkownik nie wybrał regionu (isFirstLoad && !disableAutoCenter)
          if (shouldCenterOnUser || (isFirstLoad && !disableAutoCenter)) {
            map.setView([latitude, longitude], 13, { animate: true });
            setIsFirstLoad(false);
          }
        },
        (err) => {
          console.error("Błąd pobierania lokalizacji:", {
            code: err.code,
            message: err.message,
            PERMISSION_DENIED: err.PERMISSION_DENIED,
            POSITION_UNAVAILABLE: err.POSITION_UNAVAILABLE,
            TIMEOUT: err.TIMEOUT,
          });

          // Jeśli to był timeout z wysoką dokładnością, spróbuj bez niej
          if (err.code === err.TIMEOUT && useHighAccuracy) {
            console.log("Timeout z wysoką dokładnością, próbuję bez niej...");
            tryGetPosition(false);
            return;
          }

          setLoading(false);

          // Bezpieczna obsługa błędów
          const errorCode = err.code || 0;

          if (errorCode === 1 || errorCode === err.PERMISSION_DENIED) {
            setError(
              "Odmowa dostępu do lokalizacji. Sprawdź uprawnienia w ustawieniach przeglądarki."
            );
          } else if (
            errorCode === 2 ||
            errorCode === err.POSITION_UNAVAILABLE
          ) {
            setError(
              "Lokalizacja niedostępna. Upewnij się, że GPS jest włączony."
            );
          } else if (errorCode === 3 || errorCode === err.TIMEOUT) {
            setError("Upłynął limit czasu. Kliknij aby spróbować ponownie.");
          } else {
            setError(
              `Nie udało się pobrać lokalizacji. ${
                err.message || "Spróbuj ponownie."
              }`
            );
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
  }, [map, shouldCenterOnUser, isFirstLoad, disableAutoCenter]);

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Pobierz lokalizację tylko raz przy montowaniu

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "10px",
          background: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          color: "#333",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        📍 Lokalizacja...
      </div>
    );
  }

  // Jeśli jest błąd, pokaż komunikat z przyciskiem ponowienia
  if (error) {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          maxWidth: "200px",
        }}
      >
        <div
          style={{
            color: "#dc2626",
            marginBottom: "8px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          ⚠️ Brak lokalizacji
        </div>
        <button
          onClick={() => {
            getLocation();
          }}
          style={{
            background: "#3b82f6",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            width: "100%",
            minHeight: "36px",
          }}
        >
          🔄 Ponów
        </button>
      </div>
    );
  }

  // Jeśli mamy pozycję, pokaż marker i przycisk
  if (position) {
    return (
      <>
        <Marker position={position} icon={userIcon}>
          <Popup
            autoPan={true}
            closeButton={true}
            className="mobile-friendly-popup"
          >
            <div
              style={{
                fontSize: "14px",
                lineHeight: "1.5",
                minWidth: "200px",
                padding: "4px",
              }}
            >
              <strong style={{ fontSize: "16px" }}>📍 Twoja lokalizacja</strong>
              <br />
              <span style={{ fontSize: "13px" }}>
                Szerokość: {position[0].toFixed(6)}
              </span>
              <br />
              <span style={{ fontSize: "13px" }}>
                Długość: {position[1].toFixed(6)}
              </span>
            </div>
          </Popup>
        </Marker>

        {!shouldCenterOnUser && (
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              left: "10px",
              background: "white",
              padding: "10px",
              borderRadius: "8px",
              zIndex: 1000,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <button
              onClick={() => {
                map.setView(position, 13, { animate: true });
              }}
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "10px 14px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                minHeight: "44px",
                minWidth: "44px",
                justifyContent: "center",
              }}
            >
              📍 Lokalizacja
            </button>
          </div>
        )}
      </>
    );
  }

  return null;
}

function MapViewController({ center }: { center?: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 9, { animate: true, duration: 1 });
    }
  }, [center, map]);

  return null;
}

interface MapComponentProps {
  center?: [number, number];
}

export default function MapComponent({ center }: MapComponentProps) {
  // Jeśli użytkownik wybrał region (center jest ustawiony), nie centruj automatycznie na lokalizacji użytkownika
  const userSelectedRegion = center !== undefined;

  return (
    <MapContainer
      center={center || [52.0, 19.0]}
      zoom={center ? 9 : 7}
      minZoom={6}
      maxZoom={18}
      scrollWheelZoom={true}
      zoomControl={true}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewController center={center} />
      <AlertPolygonsLayer />
      <LocationMarker
        shouldCenterOnUser={false}
        disableAutoCenter={userSelectedRegion}
      />
      <BunkersLayer />
    </MapContainer>
  );
}
