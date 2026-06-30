import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0"}
TITLES = [
    "AI Chatbot with 3D Product Experience",
    "Excel-Driven Web Chatbot",
    "Virtual Yoga Instructor",
    "AI Social Media Assistant",
]


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")


manifest = fetch("https://algobrainai.com/assets/manifest-23b6cfdb.js")
files = sorted(set(re.findall(r'"(/assets/[^"]+)"', manifest)))

for title in TITLES:
    for path in files:
        if not path.endswith(".js"):
            continue
        js = fetch("https://algobrainai.com" + path)
        if title in js:
            imgs = re.findall(r'["\'](/images/[^"\']+\.(?:png|jpg|jpeg|webp))["\']', js, re.I)
            print("TITLE", title)
            print(" FILE", path)
            print(" IMGS", imgs)
            break
