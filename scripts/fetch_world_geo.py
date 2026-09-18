import urllib.request
import json
import os

# Fetch world map GeoJSON from a reliable CDN
urls = [
    "https://cdn.jsdelivr.net/npm/echarts@5.5.0/map/json/world.json",
    "https://fastly.jsdelivr.net/npm/echarts@5.5.0/map/json/world.json",
]

target = "/home/z/my-project/public/geo/world.json"
os.makedirs(os.path.dirname(target), exist_ok=True)

for url in urls:
    try:
        print(f"Trying {url}...")
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=20) as r:
            data = r.read()
            # Validate JSON
            parsed = json.loads(data)
            with open(target, "wb") as f:
                f.write(data)
            print(f"SUCCESS: saved {len(data)} bytes to {target}")
            print(f"Features: {len(parsed.get('features', []))}")
            # Sample some country names
            names = [f["properties"].get("name", "?") for f in parsed.get("features", [])][:10]
            print(f"Sample countries: {names}")
            break
    except Exception as e:
        print(f"Failed: {e}")
        continue
