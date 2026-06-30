import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const base = "https://algobrainai.com";

const slugImages = {
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
};

const outDir = path.join(process.cwd(), "public", "work");
await mkdir(outDir, { recursive: true });

for (const [slug, imagePath] of Object.entries(slugImages)) {
  const url = `${base}${encodeURI(imagePath.trim())}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(slug, "failed", res.status, url);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const jpg = await sharp(buf).jpeg({ quality: 85 }).toBuffer();
  await writeFile(path.join(outDir, `${slug}.jpg`), jpg);
  console.log(slug, "saved", jpg.length);
}
