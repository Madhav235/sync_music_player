console.log("Liked songs js loaded");

import { playerState } from "./home1.js";
import { songAlbum } from "./home.js";

// Local storage variable and storing song data in array 

let localStorageData = JSON.parse(localStorage.getItem("likedSongsData")) || [];

// selecing like button

const likeButton = document.querySelector("#jsLikeButton");

//  Function to create the liked song object 

function createLikedSongObject(songName,songArtist,songCover,videoId) {
    // fetching song album from spotify

    return {
        Song: songName.innerHTML,
        Artist: songArtist.innerHTML,
        coverUrl: songCover.src,
        songId: videoId,
        Album: songAlbum
    }
}

function addToLocalStorage(songData) {

    // setting to local storage
    localStorageData.push(songData);
    localStorage.setItem("likedSongsData", JSON.stringify(localStorageData));
    return localStorageData.length;
}

function renderLikedSongItem(songData,idx) {

    console.log("Liked song rendering started");

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
    likedSongAlbum.innerHTML = songData.Album;
    serialNumber.innerHTML = `${idx+1}.`;

    // Rendering final item to the song container

    const likedSongsContainer = document.querySelectorAll("#jsLikedSongsContainer");
    console.log(likedSongsContainer);
    likedSongsContainer[0].prepend(likedSongItem);
}