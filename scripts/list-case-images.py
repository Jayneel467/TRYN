import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")


manifest = fetch("https://algobrainai.com/assets/manifest-23b6cfdb.js")
files = sorted(set(re.findall(r'"(/assets/[^"]+)"', manifest)))

all_imgs: set[str] = set()
for path in files:
    if not path.endswith(".js") or path.endswith("manifest-23b6cfdb.js"):
        continue
    js = fetch("https://algobrainai.com" + path)
    imgs = re.findall(r'["\'](/images/[^"\']+\.(?:png|jpg|jpeg|webp))["\']', js, re.I)
    if imgs:
        for i in imgs:
            all_imgs.add(i)

for i in sorted(all_imgs):
    print(i)
