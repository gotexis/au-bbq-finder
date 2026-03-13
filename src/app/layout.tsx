import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "AU BBQ Finder — Every Public BBQ & Picnic Spot in Australia",
    template: "%s | AU BBQ Finder",
  },
  description: "Find free public BBQs, picnic tables, and outdoor dining spots across Australia. Electric, wood, and gas BBQs with facilities info.",
  openGraph: {
    title: "AU BBQ Finder",
    description: "Find free public BBQs, picnic tables, and outdoor dining spots across Australia.",
    url: "https://bbq.rollersoft.com.au",
    siteName: "AU BBQ Finder",
    locale: "en_AU",
    type: "website",
  },
  alternates: {
    canonical: "https://bbq.rollersoft.com.au",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="autumn">
      <body className="min-h-screen bg-base-100 flex flex-col">
        <header className="navbar bg-amber-800 text-amber-50 shadow-lg">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link className="text-xl font-bold flex items-center gap-2" href="/">
              🔥 AU BBQ Finder
            </Link>
            <nav className="hidden md:flex gap-4 text-sm">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/map" className="hover:underline">Map</Link>
              <Link href="/states" className="hover:underline">By State</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="footer footer-center p-6 bg-base-200 text-base-content text-sm">
          <p>
            © {new Date().getFullYear()} AU BBQ Finder. Data from{" "}
            <a href="https://www.openstreetmap.org/copyright" className="link" target="_blank" rel="noopener">
              OpenStreetMap
            </a>{" "}
            contributors. A{" "}
            <a href="https://rollersoft.com.au" className="link" target="_blank" rel="noopener">
              Rollersoft
            </a>{" "}
            project.
          </p>
        </footer>
      </body>
    </html>
  );
}
