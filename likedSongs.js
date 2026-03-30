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

    // checking for duplicate data entry

    let duplicateEntry = false;

    for (let i = 0; localStorageData.length; i++) {
        if (localStorageData[i].videoId === songData.videoId) {
            duplicateEntry = true;
        }
    }

    if (!duplicateEntry) {
        likedSongsData.push(songData);

        console.log(likedSongsData);

        addToLocalStorage(songData);
        renderLikedSongsData(songData);
    }
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

    // setting to local storage
    localStorageData.push(songData);
    localStorage.setItem("likedSongsData", JSON.stringify(localStorageData));
}

localStorage.clear();

// Rendering liked songs data on the ui

function renderLikedSongsData(songData) {

    // Dynamically creating the item component

    const likedSongItem = document.createElement("div");
    likedSongItem.classList.add("likedSongItem");

    const serialNumber = document.createElement("div");
    serialNumber.classList.add("serialNumber");

    const likedSongCover = document.createElement("div");
    likedSongCover.classList.add("likedSongCover");

    const likedSongCoverLayout = document.createElement("div");
    likedSongCoverLayout.classList.add("likedSongCoverLayout");

    const likedSongCoverSource = document.createElement("img");
    likedSongCoverSource.classList.add("likedSongCoverSource");

    const likedSongDescription = document.createElement("div");
    likedSongDescription.classList.add("likedSongDescription");

    const likedSongInfo = document.createElement("div");
    likedSongInfo.classList.add("likedSongInfo");

    const likedSongName = document.createElement("div");
    likedSongName.classList.add("likedSongName");

    const likedSongArtist = document.createElement("div");
    likedSongArtist.classList.add("likedSongArtist");

    const likedSongAlbum = document.createElement("div");
    likedSongAlbum.classList.add("likedSongAlbum");

    const likedSongDateAdded = document.createElement("div");
    likedSongDateAdded.classList.add("likedSongDateAdded");

    const likedSongDuration = document.createElement("div");
    likedSongDuration.classList.add("likedSongDuration");

    // Putting all element in structure

    likedSongCoverLayout.appendChild(likedSongCoverSource);
    likedSongCover.appendChild(likedSongCoverLayout);

    likedSongInfo.appendChild(likedSongName);
    likedSongInfo.appendChild(likedSongArtist);

    likedSongDescription.appendChild(likedSongInfo);
    likedSongDescription.appendChild(likedSongAlbum);
    likedSongDescription.appendChild(likedSongDateAdded);
    likedSongDescription.appendChild(likedSongDuration);

    likedSongItem.appendChild(serialNumber);
    likedSongItem.appendChild(likedSongCover);
    likedSongItem.appendChild(likedSongDescription);

    // Setting up the song data

    likedSongName.innerHTML = songData.Song;
    likedSongArtist.innerHTML = songData.Artist;
    likedSongCoverSource.setAttribute("src", songData.coverUrl);

    // Rendering final item to the song container

    const likedSongsContainer = document.querySelector("#jsLikedSongsContainer");
    likedSongsContainer.appendChild(likedSongItem);
}