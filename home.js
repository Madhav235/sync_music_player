import { getSpotifyToken ,api} from "./spotifyToken.js";

// Search bar Functionality

// Search bar select, search Modal

const searchInput = document.querySelector("#searchInput");
const searchModal = document.querySelector("#jsSearchModal");
const searchBar = document.querySelector(".searchBar");

// adding click event on search input and search modal toggle logic

searchInput.addEventListener("click",(e) => {
    e.stopPropagation();
    console.log("Search bar selected");
    searchModal.classList.add("searchModalActive");
    searchBar.classList.add("searchBarActive");
});

searchModal.addEventListener("click",(e) => {
    e.stopPropagation();
})

window.addEventListener("click",() => {
    console.log("Window clicked");

    const searchModal = document.querySelector("#jsSearchModal");
    searchModal.classList.remove("searchModalActive");
    searchBar.classList.remove("searchBarActive");
    searchModal.innerHTML= "";
});

// sending user search query to the spotify api

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

    const data = await response.json();
    return data;
}

// data of one search results

let songsData = [];

// Making search modal suggestions dynamically

function createSearchModalSuggestion(song,artist,cover){
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
    imageSource.setAttribute("src",cover);

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

    songsData.push(
        {
            element : searchModalItem,
            songName : songName.innerText,
            songArtist : songArtist.innerText,
            songCover : cover
        }
    );
    // console.log(songsData);

    return songsData
}

// Implementing spotify query on user search by clicking search icon

// Taking user input

const searchIcon = document.querySelector("#jsSearchIcon");
let searchData = null;
let searchedSongs = null;


searchIcon.addEventListener("click",(e) => {
    e.stopPropagation();
    console.log("search icon clicked");
    searchData = searchSpotify(`${searchInput.value}`);

    searchData.then(data => {
        console.log(data)
        data.tracks.items.forEach(element => {
            let songName = element.name;
            let songArtist = element.artists[0].name;
            let songCover = element.album.images[0].url;
            searchedSongs = createSearchModalSuggestion(songName,songArtist,songCover);
        });

        // console.log(searchedSongs);
        searchedSongs.forEach((songs,idx) => {
            console.log(idx);
            console.log(songs);
            songs.element.addEventListener("click",(e) => {
                console.log(songs);
                console.log(e);
                console.log(idx);
                showUserSelectedSong(songs.songCover,songs.songName,songs.songArtist);
            })
        });
    })

    // console.log(searchedSongs);
    // searchData.then(data => console.log(data.tracks.items[0].artists[0].name));
    // createSearchModalSuggestion();
});

// updating the music player details with the track user selected

function showUserSelectedSong(CoverUrl,song,artist){
    console.log("Player info update started");

    // selecting needed things

    let songCoverLayoutSource = document.querySelector("#jsSongCoverLayoutSource");
    let songName = document.querySelector("#jsSongName");
    let songArtist = document.querySelector("#jsSongArtist");

    // updating the values

    songCoverLayoutSource.setAttribute("src",CoverUrl);
    songName.innerHTML = song;
    songArtist.innerHTML = artist;
}