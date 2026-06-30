"""Copy official TRYN logo PNGs and create transparent header variants."""
from __future__ import annotations

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

TOLERANCE = 22

# Known baked backgrounds in official assets
LIGHT_BG_TARGETS = [(255, 255, 255), (254, 254, 254), (252, 252, 252)]
DARK_BG_TARGETS = [
    (11, 31, 58),   # #0B1F3A
    (10, 15, 24),   # #0a0f18
    (16, 26, 40),   # #101a28 — dark-mode footer
    (2, 10, 47),    # sampled corner on source asset
]


def color_distance(c1: tuple[int, ...], c2: tuple[int, ...]) -> float:
    return sum((a - b) ** 2 for a, b in zip(c1[:3], c2[:3])) ** 0.5


def sample_background(img: Image.Image) -> tuple[int, int, int]:
    """Estimate baked background from corner pixels."""
    w, h = img.size
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((w - 1, 0)),
        img.getpixel((0, h - 1)),
        img.getpixel((w - 1, h - 1)),
        img.getpixel((w // 2, 0)),
        img.getpixel((0, h // 2)),
    ]
    rgb = [c[:3] for c in corners]
    return (
        round(sum(c[0] for c in rgb) / len(rgb)),
        round(sum(c[1] for c in rgb) / len(rgb)),
        round(sum(c[2] for c in rgb) / len(rgb)),
    )


def nearest_bg_distance(rgb: tuple[int, int, int], targets: list[tuple[int, int, int]]) -> float:
    return min(color_distance(rgb, target) for target in targets)


def remove_background(
    img: Image.Image,
    tolerance: int,
    targets: list[tuple[int, int, int]] | None = None,
) -> Image.Image:
    bg = sample_background(img)
    palette = [bg, *(targets or [])]
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            if nearest_bg_distance((r, g, b), palette) <= tolerance:
                pixels[x, y] = (r, g, b, 0)
    return rgba


def main() -> None:
    BRAND.mkdir(parents=True, exist_ok=True)

    if not LIGHT_SRC.exists():
        raise FileNotFoundError(f"Light logo source not found: {LIGHT_SRC}")
    if not DARK_SRC.exists():
        raise FileNotFoundError(f"Dark logo source not found: {DARK_SRC}")

    light = Image.open(LIGHT_SRC)
    dark = Image.open(DARK_SRC)

    # All logo variants — transparent backgrounds (no baked navy/white boxes)
    light_transparent = remove_background(light, TOLERANCE, LIGHT_BG_TARGETS)
    dark_transparent = remove_background(dark, TOLERANCE, DARK_BG_TARGETS)

    light_transparent.save(BRAND / "tryn-logo-light.png", optimize=True)
    dark_transparent.save(BRAND / "tryn-logo-dark.png", optimize=True)
    light_transparent.save(BRAND / "tryn-logo-header-light.png", optimize=True)
    dark_transparent.save(BRAND / "tryn-logo-header-dark.png", optimize=True)

    print(f"Light full: {light.size}, bg sample: {sample_background(light)}")
    print(f"Dark full: {dark.size}, bg sample: {sample_background(dark)}")
    print("Saved 4 PNG files to public/brand/")


if __name__ == "__main__":
    main()
