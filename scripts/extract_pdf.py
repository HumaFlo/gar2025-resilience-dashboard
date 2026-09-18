import pypdf
import json
import sys

pdf_path = "/home/z/my-project/upload/UNDRR-GAR2025-web-revised.pdf"

reader = pypdf.PdfReader(pdf_path)
total_pages = len(reader.pages)
print(f"Total pages: {total_pages}")

# Extract text from all pages
all_text = []
for i, page in enumerate(reader.pages):
    try:
        text = page.extract_text()
        all_text.append({"page": i+1, "text": text})
    except Exception as e:
        all_text.append({"page": i+1, "text": "", "error": str(e)})
        print(f"Page {i+1} error: {e}")

# Save full extraction
with open("/home/z/my-project/scripts/pdf_full_text.txt", "w", encoding="utf-8") as f:
    for p in all_text:
        f.write(f"\n\n===== PAGE {p['page']} =====\n")
        f.write(p.get("text", ""))

# Print first few pages to understand structure
print("\n\n===== SAMPLE PAGES (1-5) =====")
for p in all_text[:5]:
    print(f"\n--- Page {p['page']} ---")
    text = p.get("text", "")
    print(text[:2000])

print(f"\n\nTotal pages extracted: {len(all_text)}")
