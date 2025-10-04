"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

// Napraw domyślne ikony Leaflet w Next.js
if (typeof window !== "undefined") {
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
  const [allBunkers, setAllBunkers] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Stwórz niestandardową ikonę dla bunkerów
  const bunkerIcon = L.icon({
    iconUrl: "/assets/bunker.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Funkcja do filtrowania bunkerów na podstawie granic mapy
  const filterBunkersByBounds = (data: any, bounds: L.LatLngBounds) => {
    if (!data || !data.features) return null;

    const filtered = {
      ...data,
      features: data.features.filter((feature: any) => {
        if (feature.geometry.type === "Point") {
          const [lng, lat] = feature.geometry.coordinates;
          return bounds.contains([lat, lng]);
        } else if (feature.geometry.type === "Polygon") {
          // Sprawdź czy którykolwiek punkt poligonu jest w granicach
          const coords = feature.geometry.coordinates[0];
          return coords.some((coord: number[]) =>
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
  };

  // Funkcja do tworzenia warstwy GeoJSON
  const createGeoJSONLayer = (data: any) => {
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
      pointToLayer: (feature, latlng) => {
        return L.marker(latlng, { icon: bunkerIcon });
      },
      style: (feature) => {
        return {
          fillColor: "#ff7800",
          weight: 2,
          opacity: 1,
          color: "#ff7800",
          fillOpacity: 0.5,
        };
      },
    });
  };

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
  }, [map, allBunkers, bunkerIcon]);

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

  // Ikona dla lokalizacji użytkownika
  const userIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  useEffect(() => {
    // Sprawdź czy przeglądarka wspiera geolokalizację
    if (!navigator.geolocation) {
      setError("Twoja przeglądarka nie wspiera geolokalizacji");
      return;
    }

    // Pobierz lokalizację użytkownika
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        // Wyśrodkuj mapę na lokalizacji użytkownika
        map.setView([latitude, longitude], 13);
      },
      (err) => {
        console.error("Błąd pobierania lokalizacji:", err);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Odmowa dostępu do lokalizacji");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Lokalizacja niedostępna");
            break;
          case err.TIMEOUT:
            setError("Upłynął limit czasu żądania lokalizacji");
            break;
          default:
            setError("Nieznany błąd");
        }
      },
      {
        enableHighAccuracy: true, // Wysoka dokładność
        timeout: 5000, // 5 sekund timeout
        maximumAge: 0, // Nie używaj cache
      }
    );
  }, [map]);

  // Jeśli jest błąd, pokaż komunikat
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
          color: "red",
        }}
      >
        {error}
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
