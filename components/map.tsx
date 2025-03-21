"use client";
import React from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { points } from "@/lib/data";
import { MapPoint } from "@/lib/types";
import { OverviewChart } from "./overview-chart";

const CustomMarker: React.FC<{ point: MapPoint }> = ({ point }) => {
  const customIcon = React.useMemo(
    () =>
      L.icon({
        iconUrl: point.image,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: "custom-icon",
      }),
    [point.image]
  );

  return (
    <Marker position={point.position} icon={customIcon}>
      <Tooltip direction="top" offset={[0, -20]} className="custom-tooltip">
        <strong>{point.title}</strong>
      </Tooltip>
      <Popup>
        <div className="popup-content">
          <img src={point.image} alt={point.title} />
          <OverviewChart />
          <Link
            href={`/${point.id}`}
            className="bg-cyan-900 hover:bg-cyan-700 font-bold py-2 px-4 rounded"
          >
            <span className="text-white">Ver detalles</span>
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

export const Map: React.FC = () => {
  return (
    <div style={{ height: "90vh", width: "100%" }} className="p-4">
      <MapContainer
        center={[-17.382802, -66.15825]} // Coordenadas de Cochabamba
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map((point) => (
          <CustomMarker key={point.id} point={point} />
        ))}
      </MapContainer>
    </div>
  );
};
