import pypdf

pdf_path = "/home/z/my-project/upload/UNDRR-GAR2025-web-revised.pdf"
reader = pypdf.PdfReader(pdf_path)

# Extract the most strategic pages: recommendations, conclusions, key data
key_pages = [95, 96, 109, 122, 133, 165, 172, 175, 205, 210, 215, 218, 220, 225]

for pg in key_pages:
    if pg <= len(reader.pages):
        text = reader.pages[pg-1].extract_text()
        print(f"\n\n========== PAGE {pg} ==========")
        # Print first 2500 chars
        print(text[:2500])
        print("---")
