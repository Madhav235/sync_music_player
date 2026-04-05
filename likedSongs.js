console.log("Liked songs js loaded");

import { playerState } from "/home1.js";
import { songAlbum } from "/home.js";
import { playSongOnPLayer } from "/home1.js";
import { showUserSelectedSong } from "/home.js";
import { formatInMinuteSeconds } from "/home1.js";

// Local storage variable and storing song data in array
let localStorageData = JSON.parse(localStorage.getItem("likedSongsData")) || [];
let likedSongContainer = [];

// updating liked songs container

function updateLikedSongContainer() {
  console.log("Updating Conatiner");

  const likedSongsContainer = document.querySelector("#jsLikedSongsContainer");
  likedSongsContainer.innerHTML = "";

  localStorageData = JSON.parse(localStorage.getItem("likedSongsData")) || [];
  likedSongContainer = [];

  for (let i = localStorageData.length - 1; i >= 0; i--) {
    likedSongContainer.push(localStorageData[i]);
  }

  for (let i = 0; i < likedSongContainer.length; i++) {
    let songData = likedSongContainer[i];
    renderLikedSongItem(songData, i);
  }

  addEventToAllLikedSongs();
}

// selecting like button

const likeButton = document.querySelector("#jsLikeButton");

likeButton.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Like button clicked");

  // check for duplicate Entry
  let duplicateEntry = false;

  for (let i = 0; i < localStorageData.length; i++) {
    if (localStorageData[i].songId === playerState.songId) {
      duplicateEntry = true;
    }
  }

  if (!duplicateEntry) {
    let songData = createLikedSongObject();
    getAdditionDate(songData);
    setTotalDuration(songData);
    addToLocalStorage(songData);
    updateLikedSongContainer();
  }
});

//  Function to create the liked song object

function createLikedSongObject() {
  const songName = document.querySelector("#jsSongName");
  const songArtist = document.querySelector("#jsSongArtist");
  const songCover = document.querySelector("#jsSongCoverLayoutSource");

  return {
    Song: songName.innerHTML,
    Artist: songArtist.innerHTML,
    coverUrl: songCover.src,
    songId: playerState.songId,
    Album: songAlbum,
  };
}

// get the date when the song added

function getAdditionDate(data) {
  console.log("add time started");

  let date = new Date();
  console.log(date);

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
