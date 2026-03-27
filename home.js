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
    searchModal.classList.remove("searchModalActive");
    searchBar.classList.remove("searchBarActive");
});

// sending user search query to the spotify api

export async function searchSpotify(query) {
    console.log("Search query started");
    console.log(query);
    const token = await getSpotifyToken();

    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();
    return data;
}

// Making search modal suggestions dynamically

function createSearchModalSuggestion(){
    console.log("Dynamic Modal suggestion creation started");

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

    const songInformation = document.createElement("div");
    songInformation.classList.add("songInformation");

    const songName = document.createElement("div");
    songName.classList.add("songName");

    const songArtist = document.createElement("div");
    songArtist.classList.add("songArtist");

    songCoverLayout.appendChild(imageSource);
    songCover.appendChild(songCoverLayout);

    searchModalItem.appendChild(songCover);

    songInformation.appendChild(songName);
    songInformation.appendChild(songArtist);

    searchModalItem.appendChild(songInformation);

    searchModal.appendChild(searchModalItem);
}

// Implementing spotify query on user search by clicking search icon

// Taking user input

const searchIcon = document.querySelector("#jsSearchIcon");
let searchData = null;

searchIcon.addEventListener("click",(e) => {
    e.stopPropagation();
    console.log("search icon clicked");
    searchData = searchSpotify(`${searchInput.value}`);
    // searchData.then(data => console.log(data.tracks.items[0].artists[0].name));
    // createSearchModalSuggestion();
});