/**
 * Download industry-themed illustrative images for client case studies.
 * Run: node scripts/download-work-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "work");

/** Curated Unsplash photo IDs by industry theme (illustrative only). */
const SLUG_IMAGES = {
  "whatsapp-healthcare":
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=750&fit=crop",
  "3d-product-chatbot":
    "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=1200&h=750&fit=crop",
  "excel-education":
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=750&fit=crop",
  "virtual-yoga":
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=750&fit=crop",
  "social-media-ai":
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=750&fit=crop",
  "diamond-analytics":
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=750&fit=crop",
  "voice-knowledge":
    "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=750&fit=crop",
  "saree-draping":
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=750&fit=crop",
  "roleplay-wellness":
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=750&fit=crop",
  "whatsapp-sales":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=750&fit=crop",
};

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [slug, url] of Object.entries(SLUG_IMAGES)) {
    const dest = path.join(OUT_DIR, `${slug}.jpg`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed ${slug}: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`saved ${dest}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
