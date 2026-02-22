import os
import urllib.request

images = {
    'qr-code.png': 'https://placehold.co/400x400/8b0000/d4af37/png?text=QR+Code',
    'bg-pattern.png': 'https://placehold.co/1080x1920/f5f5dc/e8e8d0/png?text=Central+Vietnam+Pattern',
    'intro-bg.jpg': 'https://placehold.co/1080x1920/8b0000/d4af37/png?text=Intro+Background',
    'zone-01-thumb.jpg': 'https://placehold.co/800x600/8b0000/d4af37/png?text=Dai+Noi+Hue',
    'zone-02-thumb.jpg': 'https://placehold.co/800x600/8b0000/d4af37/png?text=Hoi+An',
    'zone-03-thumb.jpg': 'https://placehold.co/800x600/8b0000/d4af37/png?text=My+Son',
    'slide-01.jpg': 'https://placehold.co/1080x1920/8b0000/d4af37/png?text=Slide+1',
    'slide-02.jpg': 'https://placehold.co/1080x1920/8b0000/d4af37/png?text=Slide+2',
    'slide-03.jpg': 'https://placehold.co/1080x1920/8b0000/d4af37/png?text=Slide+3',
}

for filename, url in images.items():
    filepath = os.path.join('assets/images', filename)
    if filename.startswith('slide'):
        filepath = os.path.join('assets/slides', filename)
    print(f'Downloading {filename}...')
    try:
        urllib.request.urlretrieve(url, filepath)
    except Exception as e:
        print(f'Failed to download {filename}: {e}')

print('Images downloaded successfully.')
