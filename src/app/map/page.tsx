"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import bbqs from "../../../data/bbqs.json";

const ClusterMap = dynamic(() => import("../../components/ClusterMap"), { ssr: false });

type BBQ = (typeof bbqs)[0];

const FUEL_OPTIONS = ["all", "electric", "wood", "gas", "charcoal"];
const TYPE_OPTIONS = ["all", "bbq", "picnic_table"];

export default function MapPage() {
  const [fuel, setFuel] = useState("all");
  const [type, setType] = useState("all");

  const filtered = useMemo(() => {
    return bbqs.filter((b: BBQ) => {
      if (type !== "all" && b.type !== type) return false;
      if (fuel !== "all" && !b.fuel.toLowerCase().includes(fuel)) return false;
      return true;
    });
  }, [fuel, type]);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Filters */}
      <div className="bg-base-200 px-4 py-3 flex flex-wrap gap-3 items-center border-b border-base-300">
        <span className="font-semibold text-sm">Filter:</span>
        <select
          className="select select-sm select-bordered"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="bbq">🔥 BBQ Only</option>
          <option value="picnic_table">🪑 Picnic Tables</option>
        </select>
        <select
          className="select select-sm select-bordered"
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
        >
          {FUEL_OPTIONS.map((f) => (
            <option key={f} value={f}>
              {f === "all" ? "All Fuel Types" : f.charAt(0).toUpperCase() + f.slice(1)}
            </option>
          ))}
        </select>
        <span className="text-sm text-base-content/60 ml-auto">
          {filtered.length.toLocaleString()} spots shown
        </span>
      </div>
      {/* Map */}
      <div className="flex-1">
        <ClusterMap spots={filtered} />
      </div>
    </div>
  );
}
