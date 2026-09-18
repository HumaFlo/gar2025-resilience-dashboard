import pypdf

pdf_path = "/home/z/my-project/upload/UNDRR-GAR2025-web-revised.pdf"
reader = pypdf.PdfReader(pdf_path)

# Conclusion recommendations - pages 211-214
print("===== CONCLUSION & RECOMMENDATIONS (pages 211-214) =====")
for i in range(210, 215):
    text = reader.pages[i].extract_text()
    print(f"\n========== PAGE {i+1} ==========")
    print(text)
