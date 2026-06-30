import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")


manifest = fetch("https://algobrainai.com/assets/manifest-23b6cfdb.js")
files = sorted(set(re.findall(r'"(/assets/[^"]+)"', manifest)))

hits = []
for path in files:
    if not path.endswith(".js"):
        continue
    js = fetch("https://algobrainai.com" + path)
    if "whatsapp-healthcare" in js or "WhatsApp Chatbot for Healthcare" in js:
        hits.append(path)
        print("HIT", path, "len", len(js))
        imgs = re.findall(r'["\']([^"\']+\.(?:jpg|jpeg|png|webp))["\']', js, re.I)
        for i in sorted(set(imgs))[:20]:
            print(" ", i)

print("total hits", len(hits))
