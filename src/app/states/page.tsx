import Link from "next/link";
import summary from "../../../data/summary.json";

const STATE_NAMES: Record<string, string> = {
  NSW: "New South Wales", VIC: "Victoria", QLD: "Queensland",
  SA: "South Australia", WA: "Western Australia", TAS: "Tasmania",
  NT: "Northern Territory", ACT: "Australian Capital Territory",
};

export default function StatesPage() {
  const states = Object.entries(summary)
    .filter(([k]) => k !== "Other")
    .sort((a, b) => (b[1] as any).total - (a[1] as any).total);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">BBQ Spots by State</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>State</th>
              <th className="text-right">BBQs</th>
              <th className="text-right">Picnic Tables</th>
              <th className="text-right">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {states.map(([code, data]) => {
              const d = data as any;
              return (
                <tr key={code}>
                  <td className="font-semibold">{STATE_NAMES[code] || code}</td>
                  <td className="text-right">{d.bbq.toLocaleString()}</td>
                  <td className="text-right">{d.picnic.toLocaleString()}</td>
                  <td className="text-right font-bold">{d.total.toLocaleString()}</td>
                  <td>
                    <Link href={`/state/${code.toLowerCase()}`} className="btn btn-sm btn-primary">
                      View →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
