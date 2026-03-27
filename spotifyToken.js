console.log("Hey there")
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./config.js";

let accessToken = null;
let tokenExpiry = 0;

export async function getSpotifyToken() {
  if (accessToken && Date.now() < tokenExpiry) {
    console.log("Using cached Token");
    return accessToken;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET),
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials"
    })
  });

  const data = await response.json();

  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in-60) * 1000;

  return accessToken;
}

export async function api() {
    let ACCESS_TOKEN = await getSpotifyToken();
    console.log(ACCESS_TOKEN)
}

window.api = api;