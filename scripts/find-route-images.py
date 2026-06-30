import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")


manifest = fetch("https://algobrainai.com/assets/manifest-23b6cfdb.js")
for route in ["case-studies/virtual-yoga", "case-studies/social-media-ai", "case-studies/3d-product-chatbot"]:
    m = re.search(rf'"routes/{route}/index"[^}}]+"module":"([^"]+)"', manifest)
    if m:
        path = m.group(1)
        js = fetch("https://algobrainai.com" + path)
        imgs = re.findall(r'["\'](/images/[^"\']+\.(?:png|jpg|jpeg|webp)[^"\']*)["\']', js, re.I)
        print(route, path, imgs)
