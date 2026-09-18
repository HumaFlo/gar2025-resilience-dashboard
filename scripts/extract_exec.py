import pypdf

pdf_path = "/home/z/my-project/upload/UNDRR-GAR2025-web-revised.pdf"
reader = pypdf.PdfReader(pdf_path)

# Executive summary is page xi (11) which is likely around page 16-18 in PDF
# Let me check pages 14-25
print("===== EXECUTIVE SUMMARY =====")
for i in range(13, 25):
    text = reader.pages[i].extract_text()
    if text.strip() and len(text.strip()) > 200:
        print(f"\n--- PAGE {i+1} ---")
        print(text)
