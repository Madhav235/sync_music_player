import { getSpotifyToken ,api} from "./spotifyToken.js";

// export async function searchSpotify(query) {
//     console.log("Search query started");
//     const token = await getSpotifyToken(); // your existing function

//     const response = await fetch(
//         `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//     );

//     const data = await response.json();
//     return data;
// }

// searchSpotify("Ed sheeran")
// .then(data => console.log(data))

// Search bar Functionality

// Search bar select, search Modal

const searchInput = document.querySelector("#searchInput");
const searchModal = document.querySelector("#searchModal");
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