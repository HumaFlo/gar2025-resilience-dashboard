import pypdf

pdf_path = "/home/z/my-project/upload/UNDRR-GAR2025-web-revised.pdf"
reader = pypdf.PdfReader(pdf_path)

# Extract key pages with high data density
key_pages = [94, 95, 96, 107, 109, 115, 121, 122, 125, 133, 165, 172, 175, 205, 210, 215, 218]

for pg in key_pages:
    text = reader.pages[pg-1].extract_text()
    print(f"\n\n===== PAGE {pg} =====")
    print(text[:3500])
