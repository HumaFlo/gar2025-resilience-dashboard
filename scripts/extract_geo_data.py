import pypdf
import re

pdf_path = "/home/z/my-project/upload/UNDRR-GAR2025-web-revised.pdf"
reader = pypdf.PdfReader(pdf_path)

# Find pages with country/region mentions and specific data
geo_keywords = [
    "Jamaica", "Thailand", "Barbados", "Pacific", "sub-Saharan", "Caribbean", 
    "Philippines", "Bangladesh", "Ethiopia", "Chad", "Europe", "Asia",
    "Africa", "America", "India", "China", "Japan", "Brazil", "Mexico",
    "mortality per 100", "GDP", "loss", "exposure"
]

print("===== SEARCHING FOR GEOGRAPHIC DATA PAGES =====")
geo_pages = []
for i in range(80, 220):
    try:
        text = reader.pages[i].extract_text()
        if text.strip():
            text_lower = text.lower()
            count = sum(1 for kw in geo_keywords if kw.lower() in text_lower)
            if count >= 4:
                geo_pages.append(i+1)
                print(f"Page {i+1}: keyword matches={count}")
    except:
        pass

print(f"\nGeo pages found: {geo_pages}")
