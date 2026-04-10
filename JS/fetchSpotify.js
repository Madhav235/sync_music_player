import { getSpotifyToken,api } from "./spotifyToken.js";
export {spotifyData}

// sending user search query to the spotify api

let spotifyData = null

export async function searchSpotify(query) {
    console.log("Search query started");
    console.log(query);
    const token = await getSpotifyToken();

    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    spotifyData = await response.json();
    return spotifyData;
}