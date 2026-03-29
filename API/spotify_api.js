console.log("Hey There");
const CLIENT_ID = "2efb7070cba9430cbee350bd29682603";
const CLIENT_SECRET = "69e88e45ca454b29ad1b649ea88c119d";

async function getSpotifyToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
            "Content-Type": "application/x-www-form-urlencoded"
        },
    body: new URLSearchParams({
            grant_type: "client_credentials"
        })
    });

    const data = await response.json();
    console.log(data);
    return data.access_token;
}

async function api() {
    let ACCESS_TOKEN = await getSpotifyToken();
    console.log(ACCESS_TOKEN)
}

api();