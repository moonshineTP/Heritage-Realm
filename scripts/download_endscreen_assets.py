"""
Download wireframe/placeholder assets for the End Screen.
Uses free SVG/PNG from public CDNs and placeholder services.
"""
import urllib.request
import os

BASE = os.path.join(os.path.dirname(__file__), '..')

DOWNLOADS = {
    # ── Icons ──────────────────────────────────────────────────────────
    # Laurel wreath — from unpkg (heroicons, tabler, etc.)
    "assets/icons/laurel-wreath.svg":
        "https://unpkg.com/@mdi/svg@7.4.47/svg/wreath.svg",
    # Trophy icon
    "assets/icons/trophy.svg":
        "https://unpkg.com/@mdi/svg@7.4.47/svg/trophy-variant.svg",

    # ── Polaroid wireframe images (placeholder photos for endscreen) ───
    "assets/images/polaroid-01.png":
        "https://placehold.co/240x320/e2cfb8/7a5238?text=H%E1%BB%99i+An&font=serif",
    "assets/images/polaroid-02.png":
        "https://placehold.co/240x320/e2cfb8/7a5238?text=%C4%90%E1%BA%A1i+N%E1%BB%99i&font=serif",
    "assets/images/polaroid-03.png":
        "https://placehold.co/240x320/e2cfb8/7a5238?text=M%E1%BB%B9+S%C6%A1n&font=serif",

    # ── Audio: short success fanfare ──────────────────────────────────
    "assets/audio/fanfare.mp3":
        "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3",
}


def download_all():
    for rel_path, url in DOWNLOADS.items():
        dest = os.path.join(BASE, rel_path.replace("/", os.sep))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if os.path.exists(dest):
            print(f"  SKIP  {rel_path} (exists)")
            continue
        print(f"  GET   {url}\n     -> {rel_path}")
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = resp.read()
            with open(dest, "wb") as f:
                f.write(data)
            print(f"  OK    {len(data)} bytes")
        except Exception as e:
            print(f"  FAIL  {e}")


if __name__ == "__main__":
    download_all()
    print("\nDone.")
