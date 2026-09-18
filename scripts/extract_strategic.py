import pypdf

pdf_path = "/home/z/my-project/upload/UNDRR-GAR2025-web-revised.pdf"
reader = pypdf.PdfReader(pdf_path)

# Get TOC pages and Executive Summary
# Pages 5-15 likely have TOC and Exec Summary
print("===== TOC & EXEC SUMMARY (pages 5-25) =====")
for i in range(4, 25):
    text = reader.pages[i].extract_text()
    if text.strip():
        print(f"\n--- PAGE {i+1} ---")
        print(text[:3500])
