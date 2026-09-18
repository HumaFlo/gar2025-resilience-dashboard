import urllib.request
import json
import os

# Try different sources for world map GeoJSON
urls = [
    "https://raw.githubusercontent.com/apache/echarts/5.5.0/test/data/map/json/world.json",
    "https://cdn.jsdelivr.net/gh/apache/echarts@5.5.0/test/data/map/json/world.json",
    "https://fastly.jsdelivr.net/gh/apache/echarts@5.5.0/test/data/map/json/world.json",
    "https://raw.githubusercontent.com/echarts-maps/echarts-countries-js/master/echarts-countries-js/world.json",
    "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json",
]

target = "/home/z/my-project/public/geo/world.json"
os.makedirs(os.path.dirname(target), exist_ok=True)

for url in urls:
    try:
        print(f"\nTrying {url}...")
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
            parsed = json.loads(data)
            # Check structure
            if "features" in parsed:
                # GeoJSON FeatureCollection format
                with open(target, "wb") as f:
                    f.write(data)
                print(f"SUCCESS (FeatureCollection): saved {len(data)} bytes")
                print(f"Features: {len(parsed['features'])}")
                names = sorted([f["properties"].get("name", "?") for f in parsed["features"]])[:15]
                print(f"Sample countries: {names}")
                break
            elif "objects" in parsed:
                # TopoJSON - need to convert
                print(f"Got TopoJSON, attempting conversion...")
                try:
                    import subprocess
                    result = subprocess.run(
                        ["python3", "-c", "import topojson; print('ok')"],
                        capture_output=True, text=True
                    )
                    if result.returncode == 0:
                        print("topojson available")
                    else:
                        print("Installing topojson...")
                        subprocess.check_call(["pip", "install", "topojson", "-q"])
                    import topojson
                    # Try different approaches
                    try:
                        fc = topojson.topology(parsed) 
                    except:
                        # Alternative
                        fc = parsed
                    print(f"Converted: {type(fc)}")
                except Exception as conv_e:
                    print(f"Conversion failed: {conv_e}")
                    continue
    except Exception as e:
        print(f"Failed: {e}")
        continue
else:
    print("\nAll URLs failed. Will need an alternative approach.")
