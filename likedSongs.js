console.log("Liked songs js loaded");

import { videoId } from "./home1.js";

// storing song data in array

let likedSongsData = [];

// selecing like button

const likeButton = document.querySelector("#jsLikeButton");

likeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("Like button clicked");

    let songData = createLikedSongObject();
    likedSongsData.push(songData);

    console.log(likedSongsData);

    addToLocalStorage(songData)
})

//  Function to create the liked song object 

function createLikedSongObject() {

    // selecting the assets of the song playing on the time of like

    const songName = document.querySelector("#jsSongName");
    const songArtist = document.querySelector("#jsSongArtist");
    const songCover = document.querySelector("#jsSongCoverLayoutSource");

    return {
        Song: songName.innerHTML,
        Artist: songArtist.innerHTML,
        coverUrl: songCover.src,
        songId: videoId
    }
}

// Local storage variable

let localStorageData = JSON.parse(localStorage.getItem("likedSongsData")) || [];

function addToLocalStorage(songData) {

    // checking for duplicate data entry

    let duplicateEntry = false;

    for (let i = 0; localStorageData.length; i++) {
        if (localStorageData[i].videoId === songData.videoId) {
            duplicateEntry = true;
        }
    }

    // setting to local storage

    if (!duplicateEntry) {
        localStorageData.push(songData);
        localStorage.setItem("likedSongsData", JSON.stringify(localStorageData));
    }
}

// localStorage.clear();

// rendering data of liked songs into the ui

