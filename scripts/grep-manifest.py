import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")


manifest = fetch("https://algobrainai.com/assets/manifest-23b6cfdb.js")
for kw in ["yoga", "social-media", "virtual-yoga", "Gemini_Generated"]:
    print("---", kw)
    for m in re.finditer(kw, manifest, re.I):
        start = max(0, m.start() - 80)
        end = min(len(manifest), m.end() + 120)
        print(manifest[start:end].replace("\n", " "))
