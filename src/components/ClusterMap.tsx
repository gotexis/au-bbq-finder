"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

interface Spot {
  id: number;
  lat: number;
  lon: number;
  type: string;
  name: string;
  fuel: string;
  covered: string;
  fee: string;
  access: string;
  wheelchair: string;
  description: string;
}

export default function ClusterMap({
  spots,
  center = [-25.2744, 133.7751] as [number, number],
  zoom = 5,
}: {
  spots: Spot[];
  center?: [number, number];
  zoom?: number;
}) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading maxClusterRadius={60}>
        {spots.map((s) => (
          <Marker key={s.id} position={[s.lat, s.lon]}>
            <Popup>
              <div className="text-sm">
                <strong>{s.type === "bbq" ? "🔥 BBQ" : "🪑 Picnic Table"}</strong>
                {s.name && <p className="font-semibold">{s.name}</p>}
                {s.fuel && <p>Fuel: {s.fuel}</p>}
                {s.covered && <p>Covered: {s.covered}</p>}
                {s.wheelchair && <p>Wheelchair: {s.wheelchair}</p>}
                {s.description && <p className="italic">{s.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
