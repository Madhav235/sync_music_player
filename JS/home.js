import { searchSpotify } from "./fetchSpotify.js";
import { playSongOnPLayer } from "./home1.js";
export { songAlbum };

let songAlbum = null;

// Search bar Functionality

// Search bar select, search Modal

const searchInput = document.querySelector("#searchInput");
const searchModal = document.querySelector("#jsSearchModal");
const searchBar = document.querySelector(".searchBar");

// adding click event on search input and search modal toggle logic

searchInput.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Search bar selected");
  searchModal.classList.add("searchModalActive");
  searchBar.classList.add("searchBarActive");
});

searchModal.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", () => {
  console.log("Window clicked");

  const searchModal = document.querySelector("#jsSearchModal");
  searchModal.classList.remove("searchModalActive");
  searchBar.classList.remove("searchBarActive");
  searchModal.innerHTML = "";
});

// data of one search results

let songsData = [];

// Making search modal suggestions dynamically

function createSearchModalSuggestion(song, artist, cover, album) {
  console.log("Dynamic Modal suggestion creation started");
  console.log(cover);

  // selecting parent search modal
  const searchModal = document.querySelector("#jsSearchModal");

  // creating elements dynamically

  const searchModalItem = document.createElement("div");
  searchModalItem.classList.add("searchModalItem");

  const songCover = document.createElement("div");
  songCover.classList.add("songCover");

  const songCoverLayout = document.createElement("div");
  songCoverLayout.classList.add("songCoverLayout");

  const imageSource = document.createElement("img");
  imageSource.classList.add("imageSource");
  imageSource.setAttribute("src", cover);

  const songInformation = document.createElement("div");
  songInformation.classList.add("songInformation");

  const songName = document.createElement("div");
  songName.classList.add("songName");
  songName.innerText = song;

  const songArtist = document.createElement("div");
  songArtist.classList.add("songArtist");
  songArtist.innerText = artist;

  songCoverLayout.appendChild(imageSource);
  songCover.appendChild(songCoverLayout);

  searchModalItem.appendChild(songCover);

  songInformation.appendChild(songName);
  songInformation.appendChild(songArtist);

  searchModalItem.appendChild(songInformation);
  searchModal.appendChild(searchModalItem);

  songsData.push({
    element: searchModalItem,
    songName: songName.innerText,
    songArtist: songArtist.innerText,
    songCover: cover,
    songAlbum: album,
  });
  // console.log(songsData);

  return songsData;
}

// Implementing spotify query on user search by clicking search icon

// Taking user input

const searchIcon = document.querySelector("#jsSearchIcon");
let searchData = null;
let searchedSongs = null;

searchIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("search icon clicked");
  searchData = searchSpotify(`${searchInput.value}`);

  // Refreshing the search modal

  const searchModal = document.querySelector("#jsSearchModal");
  searchModal.innerHTML = "";

  searchData.then((data) => {
    console.log(data);
    data.tracks.items.forEach((element) => {
      let songName = element.name;
      let songArtist = element.artists[0].name;
      let songCover = element.album.images[0].url;
      let songAlbum = element.album.name;
      searchedSongs = createSearchModalSuggestion(
        songName,
        songArtist,
        songCover,
        songAlbum,
      );
    });

    // console.log(searchedSongs);
    searchedSongs.forEach((songs, idx) => {
      console.log(idx);
      console.log(songs);
      songs.element.addEventListener("click", (e) => {
        console.log(songs);
        console.log(e);
        console.log(idx);
        songAlbum = songs.songAlbum;
        showUserSelectedSong(songs.songCover, songs.songName, songs.songArtist);
        playSongOnPLayer(songs.songName, songs.songArtist);
      });
    });
  });

  // console.log(searchedSongs);
  // searchData.then(data => console.log(data.tracks.items[0].artists[0].name));
  // createSearchModalSuggestion();
});

// updating the music player details with the track user selected

export function showUserSelectedSong(CoverUrl, song, artist) {
  console.log("Player info update started");

  // selecting needed things

  let songCoverLayoutSource = document.querySelector(
    "#jsSongCoverLayoutSource",
  );
  let songName = document.querySelector("#jsSongName");
  let songArtist = document.querySelector("#jsSongArtist");

  // updating the values

  songCoverLayoutSource.setAttribute("src", CoverUrl);
  songName.innerHTML = song;
  songArtist.innerHTML = artist;
}

// keyboard controls

// search on enter

window.addEventListener("keyup", (e) => {
  // console.log(e.code);
  if (e.code === "Enter") {
    if (searchModal.classList.contains("searchModalActive")) {
      searchIcon.click();
    }
  }
});
