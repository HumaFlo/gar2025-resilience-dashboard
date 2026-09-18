import pypdf

pdf_path = "/home/z/my-project/upload/UNDRR-GAR2025-web-revised.pdf"
reader = pypdf.PdfReader(pdf_path)

# Look for key chapter pages - check around pages 90-130 for chapter 4-5
# Chapter 4 starts page 76 (PDF page ~92), Chapter 5 page 116 (~132), Chapter 6 page 158 (~174), Chapter 7 page 196 (~212)
# Looking for key data points - let's search for specific keywords
keywords_to_find = [
    "USD $", " trillion", " billion", "average annual losses", "AAL",
    "return on investment", "ROI", "benefit-cost ratio", "BCR",
    "by 2050", "2050", "2030",
    "recommendation", "Recommendation",
    "SIDS", "LDC", "LLDC",
    "early warning", "MHEWS",
    "flood", "storm", "earthquake", "drought", "heatwave", "wildfire",
    "spiral", "risk financing",
    "missing millions", "natural capital",
    "insurance", "credit rating", "sovereign debt"
]

# Find pages with high keyword density
print("===== SEARCHING FOR KEY DATA PAGES =====")
for i in range(80, 220):
    try:
        text = reader.pages[i].extract_text()
        if text.strip():
            text_lower = text.lower()
            count = sum(1 for kw in keywords_to_find if kw.lower() in text_lower)
            if count >= 5:  # High keyword density
                print(f"Page {i+1}: keyword matches={count}")
    except:
        pass

