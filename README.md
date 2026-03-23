# sync_music_player
# Music Player Web App

A modern music player built using JavaScript and external APIs, inspired by Spotify.

---

## Features

### Player

* Play, pause, next, previous
* Interactive progress bar
* Volume control

### Search

* Real-time song search using Spotify API
* Supports partial and flexible input

### Playback

* Songs are played using the YouTube API
* The selected track is searched on YouTube
* Best matching video is embedded and used for audio playback

### Explore

* Trending songs and playlists
* Browse music by categories (Pop, Hip-Hop, Chill, etc.)

### Recently Played

* Tracks recently played songs using localStorage
* Persists across sessions

### Suggestions

* Based on:

  * Recently played songs
  * Most played tracks
  * Trending music

---

## Tech Stack

* Frontend: HTML, CSS, JavaScript
* APIs Used:

  * Spotify API (song metadata)
  * YouTube API (audio playback)

---

## How It Works

1. User searches for a song
2. Spotify API provides metadata
3. Song is searched on YouTube
4. YouTube player streams the audio
5. Activity is stored in localStorage

---

## Project Structure

```id="gk92ms"
/src
  /components
  /services
  /utils
index.html
style.css
app.js
```

---

## Future Improvements

* Playlist creation
* Advanced recommendation system
* Dynamic UI based on song artwork

---
## Authentication (Spotify API)

This project uses Spotify’s Client Credentials Flow to access public data such as playlists, tracks, and artists.

### How it works

* A request is made to Spotify’s token endpoint using the Client ID and Client Secret.
* Spotify returns an access token valid for 1 hour.
* This token is then used to make authorized API requests.

### Token Expiry

* The access token expires after **1 hour**.
* A new token is automatically generated whenever the application reloads or makes a fresh request.

### Important Notes

* No user login is required.
* Only public data (metadata) is accessed.
* Audio streaming is not handled by Spotify due to API restrictions.

### Limitation

* If the app remains open for more than 1 hour without refreshing, the token may expire and API requests can fail.
* Refreshing the page resolves this by generating a new token.

## Playback (YouTube Integration)

Audio playback is handled using the YouTube Data API.

### How it works

* Song metadata is fetched from Spotify API.
* The song name and artist are used as a search query.
* The YouTube API returns the most relevant video.
* The video is embedded and used for playback.

### Note

* Audio is not streamed from Spotify due to API limitations.
* YouTube is used as the playback source.


## Note

This app does not stream music directly from Spotify due to API limitations. It uses YouTube for playback.

---

## Author

Madhav Agarwal
