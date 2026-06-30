import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0"}
PATHS = [
    "/assets/index-BD2Rz4gg.js",
    "/assets/custom-ai-tools-BprgWrfP.js",
    "/assets/ai-social-media-assistant-DXBgb0sW.js",
    "/assets/index-B07Jy1dh.js",
]


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")


for path in PATHS:
    js = fetch("https://algobrainai.com" + path)
    imgs = re.findall(r'["\'](/images/[^"\']+)["\']', js, re.I)
    print(path)
    for i in sorted(set(imgs)):
        print(" ", i)
