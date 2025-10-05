/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
// @ts-expect-error
// @ts-ignore
"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-compass/dist/leaflet-compass.min.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useCallback } from "react";
import type { FeatureCollection, Point } from "geojson";

// Napraw domyślne ikony Leaflet w Next.js
if (typeof window !== "undefined") {
  // @ts-expect-error - Leaflet type definitions issue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  // @ts-expect-error - Leaflet type definitions issue
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

// Komponent do wyświetlania poligonów ostrzeżeń z GeoJSON
function AlertPolygonsLayer() {
  const map = useMap();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // @ts-expect-error - Leaflet type definitions issue
    let geoJsonLayer: L.GeoJSON | null = null;

    fetch("/GeoLocations/message.geojson")
      .then((response) => response.json())
      .then((data: FeatureCollection) => {
        // @ts-expect-error - Leaflet type definitions issue
        geoJsonLayer = L.geoJSON(data, {
          style: () => ({
            fillColor: "#ff0000",
            weight: 2,
            opacity: 0.7,
            color: "#cc0000",
            fillOpacity: 0.3,
          }),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onEachFeature: (_feature: any, layer: any) => {
            layer.bindPopup(
              '<div style="padding: 5px;"><strong style="color: #cc0000;">⚠️ Strefa ostrzeżenia</strong></div>'
            );
          },
        });

        geoJsonLayer.addTo(map);
        setLoading(false);
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

// Komponent do wyświetlania obiektów z output.geojson (szpitale, policja, straż pożarna)
function EmergencyServicesLayer() {
  const map = useMap();
  const [allServices, setAllServices] = useState<FeatureCollection | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Funkcja do pobierania ikony i koloru w zależności od typu
  const getMarkerStyle = useCallback((amenity: string) => {
    switch (amenity) {
      case "hospital":
        return {
          // @ts-expect-error - Leaflet type definitions issue
          icon: L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: #ef4444; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">🏥</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
          color: "#ef4444",
        };
      case "fire_station":
        return {
          // @ts-expect-error - Leaflet type definitions issue
          icon: L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: #f97316; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">🚒</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
          color: "#f97316",
        };
      case "police":
        return {
          // @ts-expect-error - Leaflet type definitions issue
          icon: L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: #3b82f6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">👮</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
          color: "#3b82f6",
        };
      default:
        return {
          // @ts-expect-error - Leaflet type definitions issue
          icon: L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: #6b7280; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">📍</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
          color: "#6b7280",
        };
    }
  }, []);

  // Funkcja do filtrowania obiektów na podstawie granic mapy
  const filterServicesByBounds = useCallback(
    // @ts-expect-error - Leaflet type definitions issue
    (data: FeatureCollection, bounds: L.LatLngBounds) => {
      if (!data || !data.features) return null;

      const filtered: FeatureCollection = {
        ...data,
        features: data.features.filter((feature) => {
          if (feature.geometry.type === "Point") {
            const point = feature.geometry as Point;
            const [lng, lat] = point.coordinates;
            return bounds.contains([lat, lng]);
          }
          return false;
        }),
      };

      return filtered;
    },
    []
  );

  // Funkcja do tworzenia warstwy GeoJSON
  const createGeoJSONLayer = useCallback(
    (data: FeatureCollection) => {
      // @ts-expect-error - Leaflet type definitions issue
      return L.geoJSON(data, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onEachFeature: (feature: any, layer: any) => {
          if (feature.properties) {
            const props = feature.properties;
            const amenity = props.amenity || "unknown";
            const markerStyle = getMarkerStyle(amenity);

            let amenityLabel = "";
            switch (amenity) {
              case "hospital":
                amenityLabel = "🏥 Szpital";
                break;
              case "fire_station":
                amenityLabel = "🚒 Straż Pożarna";
                break;
              case "police":
                amenityLabel = "👮 Policja";
                break;
              default:
                amenityLabel = "📍 Punkt";
            }

            let popupContent = `<div style="max-width: 250px; padding: 8px;">`;
            popupContent += `<div style="background-color: ${markerStyle.color}; color: white; padding: 6px 10px; margin: -8px -8px 8px -8px; font-weight: bold; border-radius: 4px 4px 0 0;">`;
            popupContent += amenityLabel;
            popupContent += `</div>`;

            if (props.name) {
              popupContent += `<strong style="font-size: 14px;">${props.name}</strong><br/>`;
            } else {
              popupContent += `<strong style="font-size: 14px; color: #6b7280;">Bez nazwy</strong><br/>`;
            }

            if (props["addr:city"]) {
              popupContent += `<span style="color: #4b5563;">📍 ${props["addr:city"]}</span><br/>`;
            }
            if (props["addr:street"]) {
              popupContent += `<span style="color: #4b5563;">${props["addr:street"]}</span><br/>`;
            }
            if (props.website) {
              popupContent += `<br/><a href="${props.website}" target="_blank" style="color: ${markerStyle.color}; text-decoration: none; font-weight: 500;">🔗 Strona WWW</a>`;
            }

            popupContent += `</div>`;
            layer.bindPopup(popupContent);
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pointToLayer: (feature: any, latlng: any) => {
          const amenity = feature.properties?.amenity || "unknown";
          const markerStyle = getMarkerStyle(amenity);
          // @ts-expect-error - Leaflet type definitions issue
          return L.marker(latlng, { icon: markerStyle.icon });
        },
      });
    },
    [getMarkerStyle]
  );

  useEffect(() => {
    fetch("/GeoLocations/output.geojson")
      .then((response) => response.json())
      .then((data) => {
        setAllServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Błąd ładowania danych GeoJSON:", error);
        setLoading(false);
      });
  }, []);

  // Aktualizuj warstwę przy zmianie widoku mapy
  useEffect(() => {
    if (!allServices) return;

    // @ts-expect-error - Leaflet type definitions issue
    let geoJsonLayer: L.GeoJSON | null = null;

    const updateLayer = () => {
      // Usuń poprzednią warstwę
      if (geoJsonLayer) {
        geoJsonLayer.remove();
      }

      // Pobierz aktualne granice mapy z marginesem
      const bounds = map.getBounds().pad(0.1); // 10% marginesu

      // Filtruj obiekty
      const filteredData = filterServicesByBounds(allServices, bounds);

      if (filteredData && filteredData.features.length > 0) {
        // Utwórz nową warstwę
        geoJsonLayer = createGeoJSONLayer(filteredData);
        geoJsonLayer.addTo(map);
      }
    };

    // Aktualizuj warstwę na początku
    updateLayer();

    // Dodaj listener na ruch mapy
    map.on("moveend", updateLayer);

    // Cleanup
    return () => {
      map.off("moveend", updateLayer);
      if (geoJsonLayer) {
        geoJsonLayer.remove();
      }
    };
  }, [map, allServices, filterServicesByBounds, createGeoJSONLayer]);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50px",
          right: "10px",
          background: "white",
          padding: "8px",
          borderRadius: "5px",
          zIndex: 1000,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          fontSize: "12px",
        }}
      >
        Ładowanie służb...
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
  // @ts-expect-error - Leaflet type definitions issue
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

    // Spróbuj najpierw z enableHighAccuracy
    const tryGetPosition = (useHighAccuracy: boolean) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;

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
        {/* @ts-expect-error - react-leaflet type definitions issue */}
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

function CompassControl() {
  const map = useMap();
  const [compassError, setCompassError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Sprawdź czy Device Orientation API jest dostępne
    if (!window.DeviceOrientationEvent) {
      setCompassError(true);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let compass: any = null;
    let isMounted = true;
    let reactivationTimeout: NodeJS.Timeout | null = null;

    import("leaflet-compass")
      .then(() => {
        if (!isMounted) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        compass = new (L.Control as any).Compass({
          autoActive: true,
          showDigit: true,
          position: "topright",
          textErr: "Kompas niedostępny",
          callErr: () => {
            setCompassError(true);
            // Usuń kompas po błędzie
            if (compass) {
              try {
                map.removeControl(compass);
              } catch (e) {}
            }
          },
        });

        try {
          map.addControl(compass);

          // Dodaj CSS żeby wyłączyć klikanie w kompas
          setTimeout(() => {
            const compassElement = document.querySelector(
              ".leaflet-control-compass"
            );
            if (compassElement) {
              (compassElement as HTMLElement).style.pointerEvents = "none";
            }
          }, 100);

          // Backup plan: Jeśli ktoś jakoś kliknie i kompas się dezaktywuje, reaktywuj go
          const checkCompassInterval = setInterval(() => {
            if (!isMounted || !compass) {
              clearInterval(checkCompassInterval);
              return;
            }

            try {
              // Sprawdź czy kompas jest aktywny przez sprawdzenie klasy CSS
              const compassElement = document.querySelector(
                ".leaflet-control-compass"
              );
              if (
                compassElement &&
                !compassElement.classList.contains("leaflet-compass-active")
              ) {
                if (compass.activate) {
                  compass.activate();
                }
              }
            } catch (e) {}
          }, 1000); // Sprawdzaj co sekundę

          // Cleanup dla intervalu
          reactivationTimeout =
            checkCompassInterval as unknown as NodeJS.Timeout;
        } catch (e) {
          console.error("Błąd dodawania kompasu:", e);
          setCompassError(true);
        }
      })
      .catch((err) => {
        console.error("Błąd ładowania leaflet-compass:", err);
        setCompassError(true);
      });

    return () => {
      isMounted = false;
      if (reactivationTimeout) {
        clearInterval(reactivationTimeout as unknown as number);
      }
      if (compass) {
        try {
          map.removeControl(compass);
        } catch (e) {}
      }
    };
  }, [map]);

  // Nie pokazuj nic - kompas jest kontrolką Leaflet, nie React komponentem
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

// Komponent legendy
function MapLegend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "10px",
        zIndex: 1000,
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        overflow: "hidden",
        maxWidth: "250px",
      }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: "100%",
          padding: "10px 12px",
          background: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "600",
          fontSize: "14px",
          color: "#1f2937",
        }}
      >
        <span>📋 Legenda</span>
        <span style={{ fontSize: "12px" }}>{isExpanded ? "▼" : "▲"}</span>
      </button>
      {isExpanded && (
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid #e5e7eb",
            fontSize: "13px",
          }}
        >
          <div
            style={{ marginBottom: "8px", fontWeight: "600", color: "#374151" }}
          >
            Służby ratunkowe:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  border: "2px solid white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                🏥
              </div>
              <span style={{ color: "#4b5563" }}>Szpitale</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  background: "#f97316",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  border: "2px solid white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                🚒
              </div>
              <span style={{ color: "#4b5563" }}>Straż Pożarna</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  background: "#3b82f6",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  border: "2px solid white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                👮
              </div>
              <span style={{ color: "#4b5563" }}>Policja</span>
            </div>
          </div>
          <div
            style={{
              marginTop: "12px",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Inne:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  background: "#ff0000",
                  opacity: "0.3",
                  border: "2px solid #cc0000",
                  borderRadius: "3px",
                }}
              ></div>
              <span style={{ color: "#4b5563" }}>Strefy ostrzeżeń</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface MapComponentProps {
  center?: [number, number];
}

export default function MapComponent({ center }: MapComponentProps) {
  // Jeśli użytkownik wybrał region (center jest ustawiony), nie centruj automatycznie na lokalizacji użytkownika
  const userSelectedRegion = center !== undefined;

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {/* @ts-expect-error - react-leaflet type definitions issue */}
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
        <CompassControl />
        <AlertPolygonsLayer />
        <EmergencyServicesLayer />
        <LocationMarker
          shouldCenterOnUser={false}
          disableAutoCenter={userSelectedRegion}
        />
      </MapContainer>
      <MapLegend />
    </div>
  );
}
