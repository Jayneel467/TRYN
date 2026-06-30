"""Download case study images from algobrainai.com into public/work/."""
import os
import urllib.request
from urllib.parse import quote

UA = {"User-Agent": "Mozilla/5.0 (compatible; TRYN-image-fetch/1.0)"}

SLUG_IMAGES = {
    "whatsapp-healthcare": "/images/whatsapp bot in healthcare institute.png",
    "3d-product-chatbot": "/images/Gemini_Generated_Image_53cqja53cqja53cq.png",
    "excel-education": "/images/Gemini_Generated_Image_1bnki51bnki51bnk.png",
    "virtual-yoga": "/images/Gemini_Generated_Image_ekqtn6ekqtn6ekqt.png",
    "social-media-ai": "/images/Gemini_Generated_Image_uxl5s5uxl5s5uxl5.png",
    "diamond-analytics": "/images/diamond image.png",
    "voice-knowledge": "/images/voice-enabled-chatbot.jpg",
    "saree-draping": "/images/saree draping.png",
    "roleplay-wellness": "/images/wellness.jpg",
    "whatsapp-sales": "/images/ai_sales.png",
}

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "work")


def download_image(img_path: str, dest: str) -> None:
    img_path = img_path.strip()
    url = "https://algobrainai.com" + quote(img_path)
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    with open(dest, "wb") as f:
        f.write(data)


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    for slug, img_path in SLUG_IMAGES.items():
        ext = os.path.splitext(img_path.strip())[1].lower()
        dest = os.path.join(OUT_DIR, slug + ext)
        download_image(img_path, dest)
        print(f"/work/{slug}{ext}")


if __name__ == "__main__":
    main()
