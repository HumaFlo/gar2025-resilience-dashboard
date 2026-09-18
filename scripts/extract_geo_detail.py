import pypdf

pdf_path = "/home/z/my-project/upload/UNDRR-GAR2025-web-revised.pdf"
reader = pypdf.PdfReader(pdf_path)

# Extract key geo pages with specific data
for pg in [98, 99, 110, 125, 130, 141, 146, 149, 178, 216]:
    text = reader.pages[pg-1].extract_text()
    print(f"\n\n========== PAGE {pg} ==========")
    print(text[:3000])
    print("---")
