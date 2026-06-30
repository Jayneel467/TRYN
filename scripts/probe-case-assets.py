import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")


manifest = fetch("https://algobrainai.com/assets/manifest-23b6cfdb.js")
files = sorted(set(re.findall(r'"(/assets/[^"]+)"', manifest)))
case_files = [f for f in files if "case" in f.lower() or "briefcase" in f.lower()]
print("case files", case_files)

all_urls: set[str] = set()
for path in case_files:
    js = fetch("https://algobrainai.com" + path)
    urls = re.findall(r'https?://[^"\']+\.(?:jpg|jpeg|png|webp)[^"\']*', js, re.I)
    rel = re.findall(r'/(?:images|assets|img|uploads)/[^"\']+\.(?:jpg|jpeg|png|webp)', js, re.I)
    print(path, "abs", len(urls), "rel", len(rel))
    all_urls.update(urls)
    all_urls.update("https://algobrainai.com" + r for r in rel)

for u in sorted(all_urls):
    print(u)

# also scan manifest for image-like strings
for m in re.findall(r'["\']([^"\']*(?:case|whatsapp|healthcare)[^"\']*\.(?:jpg|png|webp))["\']', manifest, re.I):
    print("manifest match", m)
