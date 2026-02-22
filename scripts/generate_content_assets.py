import os
import urllib.request

audio_files = {
    'zone-01-story.mp3': 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg',
    'zone-02-story.mp3': 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg',
    'zone-03-story.mp3': 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg',
    'correct.mp3': 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg',
    'incorrect.mp3': 'https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg',
    'chime.mp3': 'https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg'
}

for filename, url in audio_files.items():
    filepath = os.path.join('assets/audio', filename)
    print(f'Downloading {filename}...')
    try:
        urllib.request.urlretrieve(url, filepath)
    except Exception as e:
        print(f'Failed to download {filename}: {e}')

print('Audio downloaded successfully.')