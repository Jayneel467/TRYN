import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const brandDir = path.join(root, "public/brand");
const publicDir = path.join(root, "public");
const appDir = path.join(root, "app");

const assetsDir =
  "C:/Users/Jayneel/.cursor/projects/c-Users-Jayneel-Desktop-TRYN/assets";
const lightSrc = path.join(
  assetsDir,
  "c__Users_Jayneel_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-5f03919c-54f4-4938-b989-22c1bb161412.png",
);
const darkSrc = path.join(
  assetsDir,
  "c__Users_Jayneel_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-c88d8511-7c24-4c29-acbf-c6e1ec461347.png",
);

const LIGHT_BACKGROUNDS = [[255, 255, 255]];
const DARK_BACKGROUNDS = [
  [11, 31, 58],
  [10, 15, 24],
  [16, 26, 40],
];

fs.mkdirSync(brandDir, { recursive: true });

function colorDistance(r, g, b, bg) {
  const dr = r - bg[0];
  const dg = g - bg[1];
  const db = b - bg[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function minBackgroundDistance(r, g, b, backgrounds) {
  let min = Infinity;
  for (const bg of backgrounds) {
    const dist = colorDistance(r, g, b, bg);
    if (dist < min) min = dist;
  }
  return min;
}

/**
 * Per-pixel color key — removes solid backgrounds without edge flood-fill,
 * which previously ate through anti-aliased letter interiors.
 */
function colorKeyBackground(data, width, height, backgrounds, tolerance, feather = 14) {
  const total = width * height;
  for (let idx = 0; idx < total; idx++) {
    const i = idx * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const dist = minBackgroundDistance(r, g, b, backgrounds);

    if (dist <= tolerance) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
    } else if (dist <= tolerance + feather) {
      const blend = (dist - tolerance) / feather;
      data[i + 3] = Math.round(data[i + 3] * blend);
    }
  }
}

async function removeSolidBackground(input, backgrounds, tolerance) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  colorKeyBackground(data, width, height, backgrounds, tolerance);

  return sharp(data, {
    raw: { width, height, channels: 4 },
  }).png();
}

async function processLogo(src, name, backgrounds, tolerance) {
  const trimmedBuffer = await (await removeSolidBackground(src, backgrounds, tolerance))
    .trim()
    .png()
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  const trimmedHeight = trimmedMeta.height ?? 1;

  const edgePad = 16;
  const headerBottomPad = edgePad + 12;
  const tridentPadTop = Math.max(14, Math.round(trimmedHeight * 0.05));

  const fullBuffer = await sharp(trimmedBuffer)
    .extend({
      top: edgePad,
      bottom: edgePad,
      left: edgePad,
      right: edgePad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const fullMeta = await sharp(fullBuffer).metadata();

  await sharp(fullBuffer).toFile(path.join(brandDir, `tryn-logo-${name}.png`));

  const headerBuffer = await sharp(trimmedBuffer)
    .extend({
      top: edgePad + tridentPadTop,
      bottom: headerBottomPad,
      left: edgePad,
      right: edgePad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const headerMeta = await sharp(headerBuffer).metadata();
  await sharp(headerBuffer).toFile(path.join(brandDir, `tryn-logo-header-${name}.png`));

  console.log(
    `${name}: full ${fullMeta.width}x${fullMeta.height}, header ${headerMeta.width}x${headerMeta.height}`,
  );

  return {
    full: { width: fullMeta.width ?? 1, height: fullMeta.height ?? 1 },
    header: { width: headerMeta.width ?? 1, height: headerMeta.height ?? 1 },
  };
}

const light = await processLogo(lightSrc, "light", LIGHT_BACKGROUNDS, 32);
const dark = await processLogo(darkSrc, "dark", DARK_BACKGROUNDS, 38);

await sharp(lightSrc)
  .resize(1200, 630, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toFile(path.join(publicDir, "og-image.png"));

const iconSize = 512;
await sharp(path.join(brandDir, "tryn-logo-header-light.png"))
  .resize(iconSize, iconSize, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .png()
  .toFile(path.join(appDir, "icon.png"));

console.log("Logo assets written.");
console.log(JSON.stringify({ light, dark }, null, 2));
