// src/components/maps.tsx
"use client";  // Esto asegura que el componente sea tratado como un Client Component

import { useEffect, useRef } from "react";

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      const googleapi = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleapi}&callback=initMap`;
      script.async = true;
      script.defer = true;

      window.initMap = () => {
        if (mapRef.current) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: -15.840221, lng: -70.021881 }, // Plaza de Armas de Puno
            zoom: 15,
            styles: [
              {
                featureType: "poi", // Puntos de interés
                elementType: "all",
                stylers: [{ visibility: "off" }] // Ocultar
              },
              {
                featureType: "transit", // Transporte público
                elementType: "all",
                stylers: [{ visibility: "off" }] // Ocultar
              },
              {
                featureType: "road", // Carreteras
                elementType: "labels", // Ocultar etiquetas de carreteras
                stylers: [{ visibility: "off" }]
              }
            ]
          });

          // Marcador en Plaza de Armas de Puno
          const markerA = new window.google.maps.Marker({
            position: { lat: -15.840221, lng: -70.021881 }, // Plaza de Armas de Puno
            map,
            label: "A", // Indicador de punto de inicio
            title: "Plaza de Armas de Puno",
          });

          // Marcador en Parque Pino
          const markerB = new window.google.maps.Marker({
            position: { lat: -15.839682, lng: -70.019993 }, // Parque Pino
            map,
            label: "B", // Indicador de punto final
            title: "Parque Pino",
          });

          const routePath = new window.google.maps.Polyline({
            path: [
              { lat: -15.840221, lng: -70.021881 }, // Plaza de Armas
              { lat: -15.839682, lng: -70.019993 }, // Parque Pino
            ],
            geodesic: true,
            strokeColor: "#FF0000", // Color rojo para la ruta
            strokeOpacity: 1.0,
            strokeWeight: 4,
          });
          routePath.setMap(map);

          // Coordenadas de la cafetería
          const cafeLocation = { lat: -15.840500, lng: -70.020800 }; // Ejemplo de una cafetería cercana

          // Marcador específico para la cafetería
          new window.google.maps.Marker({
            position: cafeLocation,
            map,
            title: "Cafeteria el pepe",
            label: {
              text: "Café",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold"
            },
            icon: {
              url: "https://maps.gstatic.com/mapfiles/ms2/micons/coffeehouse.png", // Icono personalizado para cafetería
              scaledSize: new window.google.maps.Size(40, 40) // Ajustar tamaño del icono
            }
          });
        }
      };
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMaps();
    } else {
      window.initMap();
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;
