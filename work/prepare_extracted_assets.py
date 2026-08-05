from pathlib import Path
from PIL import Image

source = Path(r"C:\Users\G15 5530\Documents\Codex\2026-08-05\i-have-a-local-folder-containing\outputs\vacs-web-assets")
target = Path(r"D:\VACS WEBSITE\VACS Spiritual Film Landing Page\assets\extracted")
target.mkdir(parents=True, exist_ok=True)

def webp(src, dst, max_width, quality):
    with Image.open(src) as image:
        image = image.convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        image.save(dst, "WEBP", quality=quality, method=6)

webp(source / "textures/paper-texture-full.png", target / "paper-texture.webp", 1800, 58)
webp(source / "textures/visiting-card-paper-texture.jpg", target / "card-paper-texture.webp", 1200, 72)
webp(source / "branding/orange-watercolor-accent.jpg", target / "orange-watercolor-accent.webp", 760, 76)
webp(source / "branding/vacs-logo-white-background.jpg", target / "social-logo.webp", 900, 86)
webp(source / "branding/vacs-logo-transparent.png", target / "logo-extracted.webp", 900, 86)

for portrait in (source / "portraits").glob("*.jpg"):
    webp(portrait, target / portrait.with_suffix(".webp").name, 1200, 82)
