#!/usr/bin/env python3
"""Scrape AU BBQ/picnic facilities from OpenStreetMap Overpass API."""
import json, requests, sys, os

OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# Query: amenity=bbq in Australia
QUERY = """
[out:json][timeout:120];
area["ISO3166-1"="AU"]->.au;
(
  node["amenity"="bbq"](area.au);
  node["leisure"="picnic_table"](area.au);
);
out body;
"""

def main():
    print("Querying Overpass API for AU BBQ & picnic nodes...", file=sys.stderr)
    resp = requests.post(OVERPASS_URL, data={"data": QUERY}, timeout=120)
    resp.raise_for_status()
    data = resp.json()
    
    elements = data.get("elements", [])
    print(f"Got {len(elements)} raw elements", file=sys.stderr)
    
    bbqs = []
    for el in elements:
        tags = el.get("tags", {})
        bbq = {
            "id": el["id"],
            "lat": el["lat"],
            "lon": el["lon"],
            "type": tags.get("amenity", tags.get("leisure", "unknown")),
            "name": tags.get("name", ""),
            "fuel": tags.get("fuel", tags.get("bbq:fuel", "")),
            "covered": tags.get("covered", tags.get("shelter", "")),
            "fee": tags.get("fee", ""),
            "access": tags.get("access", ""),
            "wheelchair": tags.get("wheelchair", ""),
            "description": tags.get("description", ""),
        }
        bbqs.append(bbq)
    
    out_path = os.path.join(os.path.dirname(__file__), "..", "data", "bbqs.json")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(bbqs, f, indent=2)
    
    print(f"Saved {len(bbqs)} BBQ/picnic spots to {out_path}", file=sys.stderr)
    
    # Stats
    types = {}
    fuels = {}
    for b in bbqs:
        types[b["type"]] = types.get(b["type"], 0) + 1
        if b["fuel"]:
            fuels[b["fuel"]] = fuels.get(b["fuel"], 0) + 1
    print(f"Types: {types}", file=sys.stderr)
    print(f"Fuels: {fuels}", file=sys.stderr)

if __name__ == "__main__":
    main()
