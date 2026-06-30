import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0"}
req = urllib.request.Request(
    "https://algobrainai.com/assets/manifest-23b6cfdb.js", headers=UA
)
manifest = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")
print("manifest len", len(manifest))
for s in ["whatsapp", "healthcare", "case", "jpg", "png", "webp", "case-studies"]:
    print(s, manifest.lower().count(s.lower()))

files = sorted(set(re.findall(r'"(/assets/[^"]+)"', manifest)))
print("assets", len(files))
for f in files:
    if any(x in f.lower() for x in ["case", "jpg", "png", "webp", "study"]):
        print(f)
