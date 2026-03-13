"use client";

import dynamic from "next/dynamic";

const ClusterMap = dynamic(() => import("../../../components/ClusterMap"), { ssr: false });

interface Spot {
  id: number; lat: number; lon: number; type: string; name: string;
  fuel: string; covered: string; fee: string; access: string;
  wheelchair: string; description: string;
}

export default function StateMapClient({
  spots, center, zoom,
}: { spots: Spot[]; center: [number, number]; zoom: number }) {
  return (
    <div className="h-[60vh]">
      <ClusterMap spots={spots} center={center} zoom={zoom} />
    </div>
  );
}
