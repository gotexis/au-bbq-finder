import Link from "next/link";
import summary from "../../data/summary.json";

const STATE_NAMES: Record<string, string> = {
  NSW: "New South Wales",
  VIC: "Victoria",
  QLD: "Queensland",
  SA: "South Australia",
  WA: "Western Australia",
  TAS: "Tasmania",
  NT: "Northern Territory",
  ACT: "Australian Capital Territory",
};

const STATE_EMOJI: Record<string, string> = {
  NSW: "🏙️",
  VIC: "🏛️",
  QLD: "☀️",
  SA: "🍷",
  WA: "🌊",
  TAS: "🌿",
  NT: "🐊",
  ACT: "🏛️",
};

export default function Home() {
  const totalBBQ = Object.values(summary).reduce((s, v) => s + (v as any).bbq, 0);
  const totalPicnic = Object.values(summary).reduce((s, v) => s + (v as any).picnic, 0);
  const total = Object.values(summary).reduce((s, v) => s + (v as any).total, 0);

  const states = Object.entries(summary)
    .filter(([k]) => k !== "Other")
    .sort((a, b) => (b[1] as any).total - (a[1] as any).total);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-700 via-amber-800 to-orange-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            🔥 Find Your Perfect BBQ Spot
          </h1>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Every free public BBQ, picnic table, and outdoor dining spot in Australia.
            Electric, wood, and gas — all on one map.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/map" className="btn btn-lg bg-white text-amber-800 hover:bg-amber-50 border-0">
              🗺️ Open Map
            </Link>
            <Link href="/states" className="btn btn-lg btn-outline border-white text-white hover:bg-white/10">
              📍 Browse by State
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="stats stats-vertical md:stats-horizontal shadow-xl w-full bg-base-100">
          <div className="stat">
            <div className="stat-figure text-amber-600 text-3xl">🔥</div>
            <div className="stat-title">BBQ Spots</div>
            <div className="stat-value text-amber-700">{totalBBQ.toLocaleString()}</div>
            <div className="stat-desc">Electric, wood & gas</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-green-600 text-3xl">🪑</div>
            <div className="stat-title">Picnic Tables</div>
            <div className="stat-value text-green-700">{totalPicnic.toLocaleString()}</div>
            <div className="stat-desc">Across Australia</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-blue-600 text-3xl">📍</div>
            <div className="stat-title">Total Spots</div>
            <div className="stat-value text-blue-700">{total.toLocaleString()}</div>
            <div className="stat-desc">From OpenStreetMap data</div>
          </div>
        </div>
      </section>

      {/* State Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse by State</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {states.map(([code, data]) => {
            const d = data as any;
            return (
              <Link
                key={code}
                href={`/state/${code.toLowerCase()}`}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-300 hover:-translate-y-1"
              >
                <div className="card-body">
                  <h3 className="card-title text-lg">
                    {STATE_EMOJI[code] || "📍"} {STATE_NAMES[code] || code}
                  </h3>
                  <div className="flex gap-4 text-sm text-base-content/70">
                    <span>🔥 {d.bbq} BBQs</span>
                    <span>🪑 {d.picnic} tables</span>
                  </div>
                  <div className="text-right text-amber-700 font-semibold">
                    {d.total.toLocaleString()} spots →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">About AU BBQ Finder</h2>
          <p className="text-base-content/70 leading-relaxed">
            Australia has thousands of free public BBQs in parks, beaches, and reserves.
            We&apos;ve mapped every one of them using OpenStreetMap data — including whether they&apos;re
            electric, wood-fired, or gas, and whether there&apos;s shelter, toilets, and wheelchair access nearby.
            No ads, no login, no app to download. Just fire up and find your spot.
          </p>
        </div>
      </section>
    </div>
  );
}
