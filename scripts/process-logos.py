"""Process TRYN logo PNGs: remove baked backgrounds, output transparent PNGs."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
ASSETS = Path(
    r"C:\Users\Jayneel\.cursor\projects\c-Users-Jayneel-Desktop-TRYN\assets"
)

LIGHT_SRC = ASSETS / (
    "c__Users_Jayneel_AppData_Roaming_Cursor_User_workspaceStorage_"
    "empty-window_images_image-7245d0bf-37b0-4c49-b204-61513f7905fa.png"
)
DARK_SRC = ASSETS / (
    "c__Users_Jayneel_AppData_Roaming_Cursor_User_workspaceStorage_"
    "empty-window_images_image-52d5b511-478b-4216-9d1c-1d86431796a6.png"
)

WHITE_BG = (255, 255, 255)
DARK_BGS = [
    (11, 31, 58),  # #0B1F3A — official navy
    (10, 15, 24),  # #0a0f18 — dark-mode page bg edge artifacts
    (16, 26, 40),  # #101a28 — dark-mode section navy edge artifacts
]

TOLERANCE_LIGHT = 32
TOLERANCE_DARK = 38


def color_distance(c1: tuple[int, ...], c2: tuple[int, ...]) -> float:
    return sum((a - b) ** 2 for a, b in zip(c1[:3], c2[:3])) ** 0.5


def matches_any_bg(rgb: tuple[int, int, int], backgrounds: list[tuple[int, int, int]], tolerance: int) -> bool:
    return any(color_distance(rgb, bg) <= tolerance for bg in backgrounds)


def flood_remove_background(
    img: Image.Image,
    backgrounds: list[tuple[int, int, int]],
    tolerance: int,
) -> Image.Image:
    """Flood-fill from image edges to remove solid background without eating logo fill."""
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    visited = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def idx(x: int, y: int) -> int:
        return y * width + x

    def enqueue(x: int, y: int) -> None:
        if x < 0 or x >= width or y < 0 or y >= height:
            return
        i = idx(x, y)
        if visited[i]:
            return
        r, g, b, a = pixels[x, y]
        if a < 8 or matches_any_bg((r, g, b), backgrounds, tolerance):
            visited[i] = 1
            queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(1, height - 1):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        pixels[x, y] = (0, 0, 0, 0)
        enqueue(x - 1, y)
        enqueue(x + 1, y)
        enqueue(x, y - 1)
        enqueue(x, y + 1)

    return rgba


def trim_transparent(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    if bbox:
        return img.crop(bbox)
    return img


def add_padding(img: Image.Image, pad: int) -> Image.Image:
    w, h = img.size
    out = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    out.paste(img, (pad, pad), img)
    return out


def process_logo(
    src: Path,
    backgrounds: list[tuple[int, int, int]],
    tolerance: int,
    name: str,
) -> dict[str, dict[str, object]]:
    img = Image.open(src)
    print(f"Source {name}: {img.size}, mode={img.mode}")

    transparent = flood_remove_background(img, backgrounds, tolerance)
    trimmed = trim_transparent(transparent)

    header = add_padding(trimmed, 8)
    header_path = BRAND / f"tryn-logo-header-{name}.png"
    header.save(header_path, optimize=True)

    full = add_padding(trimmed, 16)
    full_path = BRAND / f"tryn-logo-{name}.png"
    full.save(full_path, optimize=True)

    return {
        "header": {"path": header_path, "size": header.size, "mode": header.mode},
        "full": {"path": full_path, "size": full.size, "mode": full.mode},
    }


def verify_alpha(path: Path) -> bool:
    img = Image.open(path)
    if img.mode != "RGBA":
        return False
    pixels = img.load()
    w, h = img.size
    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    return all(pixels[x, y][3] == 0 for x, y in corners)


def main() -> None:
    BRAND.mkdir(parents=True, exist_ok=True)

    if not LIGHT_SRC.exists():
        raise FileNotFoundError(f"Light logo source not found: {LIGHT_SRC}")
    if not DARK_SRC.exists():
        raise FileNotFoundError(f"Dark logo source not found: {DARK_SRC}")

    results: dict[str, dict[str, dict[str, object]]] = {}
    results["light"] = process_logo(LIGHT_SRC, [WHITE_BG], TOLERANCE_LIGHT, "light")
    results["dark"] = process_logo(DARK_SRC, DARK_BGS, TOLERANCE_DARK, "dark")

    print("\nProcessed outputs:")
    for scheme, variants in results.items():
        for variant, info in variants.items():
            path = info["path"]
            assert isinstance(path, Path)
            size = info["size"]
            assert isinstance(size, tuple)
            has_alpha = verify_alpha(path)
            print(
                f"  {path.name}: {size[0]}x{size[1]}, mode={info['mode']}, "
                f"alpha_corners_transparent={has_alpha}"
            )


if __name__ == "__main__":
    main()
