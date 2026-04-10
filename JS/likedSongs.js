console.log("Liked songs js loaded");

import { playerState } from "./home1.js";
import { songAlbum } from "./home.js";
import { playSongOnPLayer } from "./home1.js";
import { showUserSelectedSong } from "./home.js";
import { formatInMinuteSeconds } from "./home1.js";

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

  let monthFinal = null;

  switch (month) {
    case 0:
      monthFinal = "Jan";
      break;
    case 1:
      monthFinal = "Feb";
      break;
    case 2:
      monthFinal = "Mar";
      break;
    case 3:
      monthFinal = "Apr";
      break;
    case 4:
      monthFinal = "May";
      break;
    case 5:
      monthFinal = "Jun";
      break;
    case 6:
      monthFinal = "Jul";
      break;
    case 7:
      monthFinal = "Aug";
      break;
    case 8:
      monthFinal = "Sep";
      break;
    case 9:
      monthFinal = "Oct";
      break;
    case 10:
      monthFinal = "Nov";
      break;
    case 11:
      monthFinal = "Dec";
      break;
  }

  let addDate = `${day} ${monthFinal} ${year}`;
  data.addDate = addDate;
}

// get total duration

function setTotalDuration(data) {
  let duration = player.getDuration();
  let [minutes, seconds] = formatInMinuteSeconds(duration);
  let songDuration = `${minutes}:${seconds}`;
  data.Duration = songDuration;
}

// adding to Local Storage

function addToLocalStorage(songData) {
  // setting to local storage
  localStorageData.push(songData);
  localStorage.setItem("likedSongsData", JSON.stringify(localStorageData));
}

// rendering new songs

function renderLikedSongItem(songData, idx) {
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
  serialNumber.innerHTML = `${idx + 1}.`;
  likedSongDateAdded.innerHTML = `${songData.addDate}`;
  likedSongDuration.innerHTML = `${songData.Duration}`;

  // Rendering final item to the song container

  const likedSongsContainer = document.querySelector("#jsLikedSongsContainer");
  console.log(likedSongsContainer);
  songData.element = likedSongItem;
  likedSongsContainer.appendChild(likedSongItem);
}

updateLikedSongContainer();

// playing the selected liked song on the player

function addEventToAllLikedSongs() {
  likedSongContainer.forEach((item) => {
    item.element.addEventListener("click", (e) => {
      e.stopPropagation();
      let videoId = item.songId;
      showUserSelectedSong(item.coverUrl, item.Song, item.Artist);
      playSongOnPLayer(null, null, videoId);
    });
  });
}

// opening liked songs page on clicking the liked songs

const likedSongItem = document.querySelector("#jsLikedSongsItem");

likedSongItem.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("item clicked");
  const likedSong = document.querySelector("#jsLikedSongs");
  likedSong.classList.add("active");

  const mainPanel = document.querySelector("#jsMainPanel");
  mainPanel.classList.remove("active");
});

const homeButton = document.querySelector("#jsHomeButton");

homeButton.addEventListener("click", (e) => {
  const likedSong = document.querySelector("#jsLikedSongs");
  likedSong.classList.remove("active");

  const mainPanel = document.querySelector("#jsMainPanel");
  mainPanel.classList.add("active");
});