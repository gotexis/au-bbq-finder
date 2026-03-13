#!/usr/bin/env python3
"""Process BBQ data: reverse geocode to states, create state summaries."""
import json, os

# Rough bounding boxes for AU states
STATES = {
    "NSW": {"lat": (-37.5, -28.2), "lon": (140.9, 153.7)},
    "VIC": {"lat": (-39.2, -34.0), "lon": (140.9, 150.0)},
    "QLD": {"lat": (-29.2, -10.0), "lon": (138.0, 153.6)},
    "SA":  {"lat": (-38.1, -26.0), "lon": (129.0, 141.0)},
    "WA":  {"lat": (-35.2, -13.7), "lon": (112.9, 129.0)},
    "TAS": {"lat": (-43.7, -39.5), "lon": (143.8, 148.5)},
    "NT":  {"lat": (-26.0, -10.9), "lon": (129.0, 138.0)},
    "ACT": {"lat": (-35.95, -35.1), "lon": (148.7, 149.4)},
}

def get_state(lat, lon):
    # ACT first (inside NSW)
    if -35.95 <= lat <= -35.1 and 148.7 <= lon <= 149.4:
        return "ACT"
    for state, bounds in STATES.items():
        if state == "ACT":
            continue
        if bounds["lat"][0] <= lat <= bounds["lat"][1] and bounds["lon"][0] <= lon <= bounds["lon"][1]:
            return state
    return "Other"

def main():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    with open(os.path.join(base, "data", "bbqs.json")) as f:
        bbqs = json.load(f)
    
    by_state = {}
    for b in bbqs:
        state = get_state(b["lat"], b["lon"])
        by_state.setdefault(state, []).append(b)
    
    # Write state files
    state_dir = os.path.join(base, "data", "states")
    os.makedirs(state_dir, exist_ok=True)
    
    summary = {}
    for state, items in sorted(by_state.items()):
        with open(os.path.join(state_dir, f"{state.lower()}.json"), "w") as f:
            json.dump(items, f)
        
        bbq_count = sum(1 for i in items if i["type"] == "bbq")
        picnic_count = sum(1 for i in items if i["type"] == "picnic_table")
        fuels = {}
        for i in items:
            if i["fuel"]:
                f_norm = i["fuel"].lower().strip()
                fuels[f_norm] = fuels.get(f_norm, 0) + 1
        
        summary[state] = {
            "total": len(items),
            "bbq": bbq_count,
            "picnic": picnic_count,
            "fuels": fuels,
        }
    
    with open(os.path.join(base, "data", "summary.json"), "w") as f:
        json.dump(summary, f, indent=2)
    
    for state, info in sorted(summary.items()):
        print(f"{state}: {info['total']} total ({info['bbq']} BBQ, {info['picnic']} picnic)")

if __name__ == "__main__":
    main()
