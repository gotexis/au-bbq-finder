import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import summary from "../../../../data/summary.json";
import StateMapClient from "./StateMapClient";

const STATE_NAMES: Record<string, string> = {
  nsw: "New South Wales", vic: "Victoria", qld: "Queensland",
  sa: "South Australia", wa: "Western Australia", tas: "Tasmania",
  nt: "Northern Territory", act: "Australian Capital Territory",
};

const STATE_CENTERS: Record<string, [number, number]> = {
  nsw: [-32.0, 147.0], vic: [-37.0, 144.5], qld: [-22.0, 146.0],
  sa: [-31.0, 136.0], wa: [-25.0, 122.0], tas: [-42.0, 146.5],
  nt: [-19.5, 133.5], act: [-35.3, 149.1],
};

export function generateStaticParams() {
  return Object.keys(STATE_NAMES).map((s) => ({ state: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const name = STATE_NAMES[state] || state.toUpperCase();
  return {
    title: `BBQ Spots in ${name}`,
    description: `Find free public BBQs and picnic spots in ${name}, Australia.`,
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const code = state.toLowerCase();
  if (!STATE_NAMES[code]) notFound();

  const dataPath = path.join(process.cwd(), "data", "states", `${code}.json`);
  if (!fs.existsSync(dataPath)) notFound();
  const spots = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const stateKey = code.toUpperCase();
  const info = (summary as any)[stateKey] || { total: 0, bbq: 0, picnic: 0 };
  const center = STATE_CENTERS[code] || [-25.2744, 133.7751];

  return (
    <div>
      <div className="bg-gradient-to-r from-amber-700 to-orange-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            🔥 BBQ Spots in {STATE_NAMES[code]}
          </h1>
          <p className="text-amber-100">
            {info.bbq.toLocaleString()} BBQs · {info.picnic.toLocaleString()} picnic tables · {info.total.toLocaleString()} total spots
          </p>
        </div>
      </div>
      <StateMapClient spots={spots} center={center} zoom={code === "act" ? 11 : 6} />
    </div>
  );
}
