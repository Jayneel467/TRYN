import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0"}
req = urllib.request.Request("https://algobrainai.com/case-studies", headers=UA)
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")

with open("scripts/case-studies-html.txt", "w", encoding="utf-8") as f:
    f.write(html)

for pat in ["whatsapp", "healthcare", "3d", "slug", "__NEXT_DATA__", ".jpg", ".png", ".webp"]:
    print(pat, html.lower().count(pat.lower()))

m = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.+?)</script>', html, re.S)
if m:
    print("NEXT_DATA len", len(m.group(1)))
else:
    print("no NEXT_DATA")
