console.log("music player functionality code loaded");

import { YOUTUBE_API_KEY} from "./config";  

async function searchYouTube(query) {
    console.log("New")
    console.log("Youtube search query started");
    console.log(query);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=5&key=${YOUTUBE_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error happened")
        console.error("Error fetching YouTube data:", error);
    }
}


async function playSongOnPLayer(name, artist) {
    console.log(`${name} ${artist}`);

    // Access Video Id

    let videoId = await accessVideoIdFromYoutube(name, artist);
    console.log(videoId);
    console.log("I ran first");

    // Sending accessed video ID to the iframe
    let status = sendingAcessIdToIframe(videoId);
    if (status == "VideoId Invalid") {
        console.log("VideoId Invalid")
    }
}

async function accessVideoIdFromYoutube(songName, songArtist) {
    let data = await searchYouTube(`${songName} ${songArtist}`);

    if (!data || !data.items || data.items.length === 0) {
        console.log("No results");
        return null;
    }
    console.log(data)
    let videoId = null;

    for (let item of data.items) {
        if (item.id && item.id.videoId) {
            videoId = item.id.videoId;
            break;
        }
    }
    console.log(videoId);
    return videoId
}

function sendingAcessIdToIframe(videoId) {

    console.log(`Inside sending access ${videoId}`);

    if (!videoId) {
        console.log("Invalid video ID");
        return ("Video Id Invalid");
    }

    const iframe = document.querySelector("#jsYoutubeAudioPlayer");
    iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`);
}